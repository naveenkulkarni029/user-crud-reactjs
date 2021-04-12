import React, { useState, useEffect, useMemo, useRef } from "react";
import UserDataService from "../services/UserService";
import { useTable, usePagination, useGlobalFilter } from "react-table";

const UsersList = (props) => {
  const [Users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const UsersRef = useRef();

  UsersRef.current = Users;

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUsers();
  };

  const removeAllUsers = () => {
    UserDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    UserDataService.findByTitle(searchName)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openUser = (rowIndex) => {
    const id = UsersRef.current[rowIndex].id;

    props.history.push("/users/" + id);
  };

  const deleteUser = (rowIndex) => {
    const id = UsersRef.current[rowIndex].id;

    UserDataService.remove(id)
      .then((response) => {
        props.history.push("/users");

        let newUsers = [...UsersRef.current];
        newUsers.splice(rowIndex, 1);

        setUsers(newUsers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
        // Cell: (props) => {
        //   return props.value ? "Published" : "Pending";
        // },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openUser(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteUser(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable({
    columns,
    data: Users,
  },
  useGlobalFilter,
  usePagination
  );

  return (
    <div className="list row">
      <div className="col-md-12">
        <div className="input-group mb-3">
                {console.log(globalFilter)}
          <input
           type="text"
            className="form-control"
            placeholder="Search By Any Field"
           value={globalFilter || ""}
            onChange={e => setGlobalFilter(e.target.value)}
         />
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllUsers}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default UsersList;
