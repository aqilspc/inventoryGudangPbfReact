import React, { Component } from "react";
import { Table, Button } from "reactstrap";
export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Users: [],
            newUsersData: {
                name: "",
                jenis_user: "",
                jumlah_user: ""
            },
            isLoading: false,
            status: "",
            newUsersModal: false,
            editUsersData: {
                id: "",
                name: "",
                jenis_user: "",
                jumlah_user: ""
            },
            editUsersModal: false,
            noDataFound: "",
        };
    }
    componentDidMount() {
        this.getUsers();
    }
    getUsers() {
        fetch.get("http://127.0.0.1:8000/api/user_all").then((response) => {
            if (response.status === 200) {
                this.setState({
                   Users: response.data.data ? response.data.data : [],
                });
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    }
    toggleNewUsersModal = () => {
        this.setState({
            newUsersModal: !this.state.newUsersModal,
        });
    };
    onChangeAddUsersHandler = (e) => {
        let { newUsersData } = this.state;
        newUsersData[e.target.name] = e.target.value;
        this.setState({ newUsersData });
    };
    addUsers = () => {
        fetch
            .post(
                "http://127.0.0.1:8000/api/material_insert",
                this.state.newUsersData
            )
            .then((response) => {
                const { users } = this.state;
                const newUsers = [...users];
                newUsers.push(response.data);
                this.setState(
                    {
                        users: newUsers,
                        newUsersModal: false,
                        newUsersData: {
                            name: "",
                            jenis_user: "",
                            jumlah_user: ""
                        },
                    },
                    () => this.getUsers()
                );
            });
    };
    toggleEditUsersModal = () => {
        this.setState({
            editUsersModal: !this.state.editUsersModal,
        });
    };
    onChangeEditUsersHanler = (e) => {
        let { editUsersData } = this.state;
        editUsersData[e.target.name] = e.target.value;
        this.setState({ editUsersData });
    };
    editUsers = (id, name, jenis_user, jumlah_user) => {
        this.setState({
            editUsersData: { id, name, jenis_user, jumlah_user },
            editUsersModal: !this.state.editUsersModal,
        });
    };

    updateUsers = () => {
        let {
            id,
            name,
            jenis_user,
            jumlah_user,
        } = this.state.editUsersData;
        this.setState({
            isLoading: true,
        });
        fetch
            .post("http://127.0.0.1:8000/api/user_update", {
                id,
                name,
                jenis_user,
                jumlah_user
            })
            .then((response) => {
                this.getUsers();
                this.setState({
                    editUsersModal: false,
                    editUsersData: {
                        name,
                        jenis_user,
                        jumlah_user
                    },
                    isLoading: false,
                });
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                console.log(error.response);
            });
    };

    deletUsers = (id) => {
        this.setState({
            isLoading: true,
        });
        fetch
            .delete("http://127.0.0.1:8000/api/user_delete" + id)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getUsers();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const { newUsersData, editUsersData, noDataFound, user } =this.state;
        let userDetails = [];
        if (user.length) {
            userDetails = user.map((users) => {
                return (
                    <tr key={users.id}>
                        <td>{users.id}</td>
                        <td>{users.name}</td>
                        <td>{users.jenis_user}</td>
                        <td>{users.jumlah_user}</td>
                        <td>
                            <Button
                                color="success"
                                className="mr-3"
                                size="sm"
                                onClick={() =>
                                    this.editUsers(
                                        users.id,
                                        users.name,
                                        users.jenis_user,
                                        users.jumlah_user
                                    )
                                }
                            >
                                Edit
                            </Button>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => this.deletMaterial(users.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                );
            });
        }

        if (this.state.isLoading) {
            return <div className="spinner-border text-center" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        }
    }
}