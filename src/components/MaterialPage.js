import React, { Component } from "react";
import { Table, Button } from "reactstrap";
export default class Material extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material: [],
            newMaterialData: {
                name: "",
                jenis_material: "",
                jumlah_material: ""
            },
            isLoading: false,
            status: "",
            newMaterialModal: false,
            editMaterialData: {
                id: "",
                name: "",
                jenis_material: "",
                jumlah_material: ""
            },
            editMaterialModal: false,
            noDataFound: "",
        };
    }
    componentDidMount() {
        this.getMaterial();
    }
    getMaterial() {
        fetch.get("http://127.0.0.1:8000/api/material_all").then((response) => {
            if (response.status === 200) {
                this.setState({
                    material: response.data.data ? response.data.data : [],
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
    toggleNewMaterialModal = () => {
        this.setState({
            newMaterialModal: !this.state.newMaterialModal,
        });
    };
    onChangeAddMaterialHandler = (e) => {
        let { newMaterialData } = this.state;
        newMaterialData[e.target.name] = e.target.value;
        this.setState({ newMaterialData });
    };
    addMaterial = () => {
        fetch
            .post(
                "http://127.0.0.1:8000/api/material_insert",
                this.state.newMaterialData
            )
            .then((response) => {
                const { material } = this.state;
                const newMaterial = [...material];
                newMaterial.push(response.data);
                this.setState(
                    {
                        material: newMaterial,
                        newMaterialModal: false,
                        newMaterialData: {
                            name: "",
                            jenis_material: "",
                            jumlah_material: ""
                        },
                    },
                    () => this.getMaterial()
                );
            });
    };
    toggleEditMaterialModal = () => {
        this.setState({
            editMaterialModal: !this.state.editMaterialModal,
        });
    };
    onChangeEditMaterialHanler = (e) => {
        let { editMaterialData } = this.state;
        editMaterialData[e.target.name] = e.target.value;
        this.setState({ editMaterialData });
    };
    editMaterial = (id, name, jenis_material, jumlah_material) => {
        this.setState({
            editMaterialData: { id, name, jenis_material, jumlah_material },
            editMaterialModal: !this.state.editMaterialModal,
        });
    };

    updateMaterial = () => {
        let {
            id,
            name,
            jenis_material,
            jumlah_material,
        } = this.state.editStudentData;
        this.setState({
            isLoading: true,
        });
        fetch
            .post("http://127.0.0.1:8000/api/material_update", {
                id,
                name,
                jenis_material,
                jumlah_material
            })
            .then((response) => {
                this.getMaterial();
                this.setState({
                    editMaterialModal: false,
                    editMaterialData: {
                        name,
                        jenis_material,
                        jumlah_material
                    },
                    isLoading: false,
                });
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                console.log(error.response);
            });
    };

    deletMaterial = (id) => {
        this.setState({
            isLoading: true,
        });
        fetch
            .delete("http://127.0.0.1:8000/api/material_delete" + id)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getMaterial();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const { newMaterialData, editMaterialData, noDataFound, material } =
            this.state;
        let materialDetails = [];
        if (material.length) {
           materialDetails = material.map((materials) => {
                return (
                    <tr key={materials.id}>
                        <td>{materials.id}</td>
                        <td>{materials.name}</td>
                        <td>{materials.jenis_material}</td>
                        <td>{materials.jumlah_material}</td>
                        <td>
                            <Button
                                color="success"
                                className="mr-3"
                                size="sm"
                                onClick={() =>
                                    this.editMaterial(
                                        materials.id,
                                        materials.name,
                                        materials.jenis_material,
                                        materials.jumlah_material
                                    )
                                }
                            >
                                Edit
                            </Button>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => this.deletMaterial(materials.id)}
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