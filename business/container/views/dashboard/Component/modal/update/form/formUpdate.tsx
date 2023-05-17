import styles from "./styles.module.css";
import InputImput from "./inputImput/inputImput";
import BtnSave from "./btnSave/btnUpdate";
import React, {ChangeEvent, useEffect, useState} from "react";
import config from "../../../../../../../../infrastructure/config";
import axios from "axios";
import GalleryUpdate from "./gallery/gallery";
import PlansUpdate from "./plans/plans";

export default function UpdateApto({closeModal, code_apto}:any) {

    //console.log(code_apto)
    const [file, setFile] = useState<File>();
    const [preview, setPreview] = useState<any>();
    const [values, setValues] = useState<any>({tenant:config.TENANT});
    const [gallery, setGallery] = useState<any>([]);
    const [plans, setPlans] = useState<any>([]);
    const [newGallery, setNewGallery] = useState<any>();
    const [newGalleryDev, setNewGalleryDev] = useState<any>([]);
    const [newPlans, setNewPlans] = useState<any>();
    const [newPlansDev, setNewPlansDev] = useState<any>([]);
    const [galleyDelete, setGalleryDelete] = useState<Array<any>>([]);
    const [plansDelete, setPlansDelete] = useState<Array<any>>([]);
    const [dpto, setDpto] = useState({
        resource_id: "", name:"", description: "", owner: "", status: "", characteristics: [{}]
    })

    const characteristics = (code: string) => {
        return dpto.characteristics.filter(((char: any) => char.code === code)).map((obj: any) => obj.value)
    }

    const handleChange = (evt:any) =>{
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value.split(/(\\|\/)/g).pop()
        });
    }
    const handleChangeUpdate = (evt:any) =>{
        const value = evt.target.value;
        setDpto({
            ...dpto,
            [evt.target.name]: value
        });
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            console.log(e.target.files[0])
        }
    };

    const btn_close = () => {
        closeModal(false);
    }

    const getRcode = () => {
        const configuration = {
            method: 'get',
            headers: {
                xsrfCookie: `tenant=${config.TENANT as string}`,
            },
            url: config.API_URL+'/api/v1/resource/search?resource_id='+code_apto,
            withCredentials: true
        }

        axios.request(configuration).then((response) => {
            console.log("Response => ",response.data.data[0]);
            setDpto(response.data.data[0]);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getRcode()
        values.description = dpto?.description;
        values.beds = characteristics("beds").toString();
        values.type = characteristics("type").toString();
        values.bathrooms = characteristics("bathrooms").toString();
        values.bedrooms = characteristics("bathrooms").toString();
        values.rooms = characteristics("bathrooms").toString();
        values.capacity_adults = characteristics("capacity_adults").toString();
        values.capacity_kids = characteristics("capacity_kids").toString();
        values.location = characteristics("location").toString();
        values.price = characteristics("price").toString();
        values.currency = characteristics("currency").toString();
        values.wifi = characteristics('wifi').toString();
        values.view_sea = characteristics('view_sea').toString();
        values.parking =characteristics('parking').toString();
        values.pool=characteristics('pool').toString();
        values.access_beach=characteristics('access_beach').toString();
        values.washer=characteristics('washer').toString();
        values.air_conditioning=characteristics('air_conditioning').toString();
        values.kitchen=characteristics('kitchen').toString();
        values.airport=characteristics('airport').toString();
        values.pets=characteristics('pets').toString();
        values.historic_center=characteristics('historic_center').toString();
        values.smoke=characteristics('smoke').toString();
        values.calendar=characteristics('calendar').toString();
        values.entry_time=characteristics('entry_time').toString();
        values.departure_time=characteristics('departure_time').toString();
        values.sofa_bed=characteristics('sofa_bed').toString();
        values.durationAvailable=characteristics('durationAvailable').toString();
        values.location_map=characteristics('location_map').toString();
        values.id_calendar=characteristics('id_calendar').toString();
        values.imagePrincipal=characteristics('imagePrincipal').toString();
        values.gallery= characteristics("gallery")[0];
        values.plans=characteristics("plans")[0];
        values.description_english=characteristics('description_english').toString();
        values.tv=characteristics('tv').toString();
        values.heater=characteristics('heater').toString();
        values.jacuzzi=characteristics('jacuzzi').toString();
        values.gym=characteristics('gym').toString();
        values.date_block=characteristics('date_block')[0];
        setNewGallery(characteristics("gallery")[0]);
        setNewPlans(characteristics("plans")[0]);
        //validateImg()
    }, [dpto.resource_id])
    //console.log("value  => ",values)

    // preview new principal image
    useEffect(() => {
        if (!file) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    let arrayView: any[] = []
    const  deleteImageGallery = (id:number) => {

        if(newGallery){
            if (Array.isArray(newGallery.data)){
                galleyDelete.push(newGallery.data[id]);
                // values.gallery.data.splice(id, id);
                if(id === 0){
                    newGallery.data.splice(id, id+1)
                    setNewGalleryDev(newGallery);
                }else{
                    newGallery.data.splice(id, 1);
                    setNewGalleryDev(newGallery);
                }
            }
        }

        arrayView.push(newGallery);
        setNewGalleryDev(arrayView);
        // console.log("array view => ",arrayView);
    }

    let arrayViewPlans: any[] = []
    const  deleteImagePlans = (id:number) => {
        if(values.plans){
            if (Array.isArray(newPlans.data)){
                // values.gallery.data.splice(id, id);
                plansDelete.push(newPlans.data[id])
                console.log("plans id => ",newPlans.data[id]);
                if(id === 0){
                    newPlans.data.splice(id, id+1);
                    setNewPlansDev(newPlans);
                }else{
                    newPlans.data.splice(id, 1);
                    setNewPlansDev(newPlans);
                }
                // console.log("id array => ", id)

            }
        }

        arrayViewPlans.push(newPlans);
        setNewGalleryDev(arrayViewPlans);
    }
    // console.log("savePlansToDelete => ",plansDelete)
    const handleGallery = (e: ChangeEvent<HTMLInputElement>) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        //console.log("gallery choosen => ", chosenFiles)
        if (chosenFiles.length <= 10) {
            setGallery(chosenFiles);
        }else{
            alert("Solo se pueden añadir 10 imagenes!");
            e.target.value = '';
        }
    };

    const handlePlans= (e: ChangeEvent<HTMLInputElement>) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        if (chosenFiles.length <= 10) {
            setPlans(chosenFiles);
        }else{
            alert("Solo se pueden añadir 10 imagenes!");
            e.target.value = '';
        }
    };

    return (
        <>
            <div className={"row "+ styles.header_body}>
                <div className={"col"}>
                    <h4>Editar apartamento</h4>
                </div>
                <div className={"col " +styles.close}>
                    <a title="Cancelar" onClick={btn_close}>
                        <i className='bx bx-x'></i>
                    </a>
                </div>
            </div>

            <div className={styles.general}>
                <form className={styles.form}>

                    <h5>Principal</h5>
                    <div className="row">
                        <div className="col-4" >
                            <InputImput
                                type="text" name="resource_id"
                                value={dpto.resource_id}
                                onChange={handleChangeUpdate}
                                // disabled
                            />
                        </div>
                        <div className="col-4">
                            <InputImput
                                type={"text"} name="name"
                                value={dpto.name}
                                onChange={handleChangeUpdate}

                            />
                        </div>
                        <div className={"col-4 "+styles.selects}>
                            {values.type === 'Vacaciones' ?
                                <select onChange={handleChangeUpdate} name="type" required>
                                    <option value={values.type}>{values.type}</option>
                                    <option value="Trabajo" >Trabajo</option>
                                    <option value="Compra" >Para compra</option>
                                </select>
                            : values.type === 'Trabajo' ?
                                <select onChange={handleChangeUpdate} name="type" required>
                                    <option value={values.type}>{values.type}</option>
                                    <option value="Vacaciones" >Vacaciones</option>
                                    <option value="Compra" >Para compra</option>
                                </select>
                            :   <select onChange={handleChangeUpdate} name="type" required>
                                    <option value={values.type}>{values.type === "Compra" ? "Para compra" : null}</option>
                                    <option value="Vacaciones" >Vacaciones</option>
                                    <option value="Trabajo" >Trabajo</option>
                                </select>
                            }

                        </div>
                    </div>

                    <textarea
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Descripción"
                        required
                    />

                    <textarea
                        name="description_english"
                        value={values.description_english}
                        onChange={handleChange}
                        placeholder="Descripción en inglés"
                        required
                    />

                    <div className="row">
                        <div className="col-4">
                            <input
                                type="number" name="beds" placeholder="Camas"
                                value={values.beds}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <input
                                type="number" name="bathrooms" placeholder="Baños"
                                value={values.bathrooms}
                                onBlur={handleChange}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <input
                                type="number" name="rooms" placeholder="Habitaciones"
                                value={values.rooms}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <input
                                type="number" name="sofa_bed" placeholder="Sofá cama"
                                value={values.sofa_bed}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <input
                                type="number" name="bedrooms" placeholder="Alcobas"
                                value={values.bedrooms}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <input
                                type="number" name="capacity_kids" placeholder="Cantidad de niños"
                                value={values.capacity_kids}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <input
                                type="number" name="capacity_adults" placeholder="Cantidad de adultos"
                                value={values.capacity_adults}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <input
                                type="text" name="location" placeholder="Ubicación"
                                value={values.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <input
                                type="number" name="price" placeholder="Precio"
                                value={values.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={"col-4 "+styles.selects}>
                            {dpto.status === "Available" ?
                                <select onChange={handleChangeUpdate} name="status" required>
                                    <option value={dpto.status}>Disponible</option>
                                    <option value="Disabled">No disponible</option>
                                </select>
                            :
                                <select onChange={handleChangeUpdate} name="status" required>

                                    <option value="Available">Disponible</option>
                                    <option value={dpto.status}>No disponible</option>
                                </select>
                            }
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className="col-4">
                            <input
                                type="text" name="owner" placeholder="Propietario"
                                value={dpto.owner}
                                onChange={handleChangeUpdate}
                                required
                            />
                        </div>

                        {/*<div className="col-4">*/}
                        {/*    <input*/}
                        {/*        type="text" name="currency" placeholder="Moneda"*/}
                        {/*        value={values.currency}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                    <div className="col-4">
                        <InputImput
                            type="number" name="durationAvailable" placeholder="Días máximos a reservar"
                            value={values.durationAvailable}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <hr />
                    <div>
                        <h5>Imagenes</h5>
                        <div className={"row"}>
                            <div className="col-6">
                                <p><strong>Portada</strong></p>
                                <div>
                                    <img src={characteristics('imagePrincipal').toString()} width={270} height={170} />
                                </div><br/>

                            </div>
                            <div className="col-6">
                                {file &&  <div><p><strong>Nueva portada</strong></p><img src={preview} width={270} height={170}/></div> }

                                <p><strong>Seleccione una nueva portada</strong></p>
                                <input type="file" name="imgPrincipal" className="custom-file-input" id="inputFileSingle" required
                                       accept="image/*" onChange={handleFileChange}/>
                            </div>
                        </div><br/>

                        <div>
                            <p><strong>Galería</strong></p>
                            <div className={"row "+styles.images}>
                                <GalleryUpdate
                                    setNewGalleryDev={setNewGalleryDev}
                                    newGalleryDev={newGalleryDev}
                                    deleteImageGallery={deleteImageGallery}
                                    newGallery={newGallery}
                                />
                                <div className="col-6">
                                    <input type="file" name="galleryImg" className="custom-file-input" id="inputFileMultiple"
                                           required accept="image/*" multiple onChange={handleGallery}/>
                                    <br/>
                                </div>
                            </div>
                        </div>

                        {values.type === "Compra" ?
                            <div>
                            <p><strong>Planos</strong></p>
                            <div className={"row "+styles.images}>
                                <PlansUpdate
                                    setNewPlansDev={setNewPlansDev}
                                    newPlansDev={newPlansDev}
                                    deleteImagePlans={deleteImagePlans}
                                    newPlans={newPlans}
                                />
                                <div className="col-6">
                                <input type="file" name="plans" className="custom-file-input" id="inputFileMultiple"
                                       required accept="image/*" multiple onChange={handlePlans}/>
                                </div>
                            </div>
                        </div>: null}
                    </div>
                    <hr />
                    <div>
                        <h5>Características:</h5>
                        <div className={"row "+styles.chars}>

                            <div className="col-3">
                                <p>Wi-fi:</p>
                                <div className="row">
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name={'wifi'}
                                            id="inlineRadio1"
                                            value={1}
                                            onChange={handleChange}
                                            checked={values.wifi === '1'}
                                        />
                                        <label className="form-check-label" htmlFor="inlineRadio1">Si</label>
                                    </div>
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="wifi"
                                            id="inlineRadio1"
                                            value={0}
                                            onChange={handleChange}
                                            checked={values.wifi === '0'}
                                        />
                                        <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-3">

                                <p>Vista al mar:</p>
                                <div className="row">
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="view_sea"
                                            value={1}
                                            onChange={handleChange}
                                            checked={values.view_sea === '1'}
                                        />
                                        <label className="form-check-label">Si</label>
                                    </div>
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="view_sea"
                                            value={0}
                                            onChange={handleChange}
                                            checked={values.view_sea === '0'}
                                        />
                                        <label className="form-check-label">No</label>
                                    </div>

                                </div>
                            </div>
                            <div className="col-3">

                                <p>Parqueadero:</p>
                                <div className="row">
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="parking"
                                            value={1}
                                            onChange={handleChange}
                                            checked={values.parking === '1'}
                                        />
                                        <label className="form-check-label">Si</label>
                                    </div>
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="parking"
                                            value={0}
                                            onChange={handleChange}
                                            checked={values.parking === '0'}
                                        />
                                        <label className="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">

                                <p>Piscina:</p>
                                <div className="row">
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="pool"
                                            value={1}
                                            onChange={handleChange}
                                            checked={values.pool === '1'}
                                        />
                                        <label className="form-check-label">Si</label>
                                    </div>
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="pool"
                                            value={0}
                                            onChange={handleChange}
                                            checked={values.pool === '0'}
                                        />
                                        <label className="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={"row "+styles.chars}>

                        <div className="col-3">
                            <p>Cocina:</p>
                            <div className="row">
                                <div className="col-3">
                                    <input
                                        className="form-check-input" type="radio"
                                        name="kitchen"
                                        value={1}
                                        onChange={handleChange}
                                        checked={values.kitchen === '1'}
                                    />
                                    <label className="form-check-label">Si</label>
                                </div>
                                <div className="col-3">
                                    <input
                                        className="form-check-input" type="radio"
                                        name="kitchen"
                                        value={0}
                                        onChange={handleChange}
                                        checked={values.kitchen === '0'}
                                    />
                                    <label className="form-check-label">No</label>
                                </div>
                            </div>
                        </div>

                        <div className="col-3">

                            <p>Aire acondicionado:</p>
                            <div className="row">
                                <div className="col-3">
                                    <input
                                        className="form-check-input" type="radio"
                                        name="air_conditioning"
                                        value={1}
                                        onChange={handleChange}
                                        checked={values.air_conditioning === '1'}
                                    />
                                    <label className="form-check-label">Si</label>
                                </div>
                                <div className="col-3">
                                    <input
                                        className="form-check-input" type="radio"
                                        name="air_conditioning"
                                        value={0}
                                        onChange={handleChange}
                                        checked={values.air_conditioning === '0'}
                                    />
                                    <label className="form-check-label">No</label>
                                </div>

                            </div>
                        </div>
                        <div className="col-3">

                            <p>Lavadora y secadora:</p>
                            <div className="row">
                                <div className="col-3">
                                    <input
                                        className="form-check-input" type="radio"
                                        name="washer"
                                        value={1}
                                        onChange={handleChange}
                                        checked={values.washer === '1'}
                                    />
                                    <label className="form-check-label">Si</label>
                                </div>
                                <div className="col-3">
                                    <input
                                        className="form-check-input" type="radio"
                                        name="washer"
                                        value={0}
                                        onChange={handleChange}
                                        checked={values.washer === '0'}
                                    />
                                    <label className="form-check-label">No</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">

                            <p>Acceso a la playa:</p>
                            <div className="row">
                                <div className="col-3">
                                    <input
                                        className="form-check-input" type="radio"
                                        name="access_beach"
                                        value={1}
                                        onChange={handleChange}
                                        checked={values.access_beach === '1'}
                                    />
                                    <label className="form-check-label">Si</label>
                                </div>
                                <div className="col-3">
                                    <input
                                        className="form-check-input" type="radio"
                                        name="access_beach"
                                        value={0}
                                        onChange={handleChange}
                                        checked={values.access_beach === '0'}
                                    />
                                    <label className="form-check-label">No</label>
                                </div>
                            </div>
                        </div>

                            {/* Extra charactheritics */}
                            <div className={"row "+styles.chars}>

                                <div className="col-3">
                                    <p>Cerca al aereopuerto:</p>
                                    <div className="row">
                                        <div className="col-3">
                                            <input
                                                className="form-check-input" type="radio"
                                                name="airport"
                                                value={1}
                                                onChange={handleChange}
                                                checked={values.airport === '1'}
                                            />
                                            <label className="form-check-label">Si</label>
                                        </div>
                                        <div className="col-3">
                                            <input
                                                className="form-check-input" type="radio"
                                                name="airport"
                                                value={0}
                                                onChange={handleChange}
                                                checked={values.airport === '0'}
                                            />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-3">

                                    <p>Cerca al centro histórico:</p>
                                    <div className="row">
                                        <div className="col-3">
                                            <input
                                                className="form-check-input" type="radio"
                                                name="historic_center"
                                                value={1}
                                                onChange={handleChange}
                                                checked={values.historic_center === '1'}
                                            />
                                            <label className="form-check-label">Si</label>
                                        </div>
                                        <div className="col-3">
                                            <input
                                                className="form-check-input" type="radio"
                                                name="historic_center"
                                                value={0}
                                                onChange={handleChange}
                                                checked={values.historic_center === '0'}
                                            />
                                            <label className="form-check-label">No</label>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-3">

                                    <p>Hora de entrada:</p>
                                    <div className="row">
                                        <div className="col-3">
                                            <input
                                                type="time"
                                                name="entry_time"
                                                value={values.entry_time}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">

                                    <p>Hora de salida:</p>
                                    <div className="row">
                                        <div className="col-3">
                                            <input
                                                type="time"
                                                name="departure_time"
                                                value={values.departure_time}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <br/>
                            <div className={"row "+styles.chars}>
                                <div className="col-3">

                                    <p>Pets:</p>
                                    <div className="row">
                                        <div className="col-3">
                                            <input
                                                className="form-check-input" type="radio"
                                                name="pets"
                                                value={1}
                                                onChange={handleChange}
                                                checked={values.pets === '1'}
                                            />
                                            <label className="form-check-label">Si</label>
                                        </div>
                                        <div className="col-3">
                                            <input
                                                className="form-check-input" type="radio"
                                                name="pets"
                                                value={0}
                                                onChange={handleChange}
                                                checked={values.pets === '0'}
                                            />
                                            <label className="form-check-label">No</label>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-3">

                                    <p>Prohibido fumar:</p>
                                    <div className="row">
                                        <div className="col-3">
                                            <input
                                                className="form-check-input" type="radio"
                                                name="smoke"
                                                value={1}
                                                onChange={handleChange}
                                                checked={values.smoke === '1'}
                                            />
                                            <label className="form-check-label">Si</label>
                                        </div>
                                        <div className="col-3">
                                            <input
                                                className="form-check-input" type="radio"
                                                name="smoke"
                                                value={0}
                                                onChange={handleChange}
                                                checked={values.smoke === '0'}
                                            />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-6"}>
                                    <p>Link ubicación Google Maps:</p>
                                    <div className={"col "+styles.loc_map}>
                                        <textarea
                                            name="location_map"
                                            value={values.location_map}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <p>Televisión:</p>
                                <div className="row">
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="tv"
                                            value={1}
                                            onChange={handleChange}
                                            checked={values.tv === '1'}
                                        />
                                        <label className="form-check-label">Si</label>
                                    </div>
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="tv"
                                            value={0}
                                            onChange={handleChange}
                                            checked={values.tv === '0'}
                                        />
                                        <label className="form-check-label">No</label>
                                    </div>

                                </div>
                            </div>
                            <div className="col-3">

                                <p>Calentador de agua:</p>
                                <div className="row">
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="heater"
                                            value={1}
                                            onChange={handleChange}
                                            checked={values.heater === '1'}
                                        />
                                        <label className="form-check-label">Si</label>
                                    </div>
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="heater"
                                            value={0}
                                            onChange={handleChange}
                                            checked={values.heater === '0'}
                                        />
                                        <label className="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-3">

                                <p>Jacuzzi:</p>
                                <div className="row">
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="jacuzzi"
                                            value={1}
                                            onChange={handleChange}
                                            checked={values.jacuzzi === '1'}
                                        />
                                        <label className="form-check-label">Si</label>
                                    </div>
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="jacuzzi"
                                            value={0}
                                            onChange={handleChange}
                                            checked={values.jacuzzi === '0'}
                                        />
                                        <label className="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-3">

                                <p>Gimnasio:</p>
                                <div className="row">
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="gym"
                                            value={1}
                                            onChange={handleChange}
                                            checked={values.gym === '1'}
                                        />
                                        <label className="form-check-label">Si</label>
                                    </div>
                                    <div className="col-3">
                                        <input
                                            className="form-check-input" type="radio"
                                            name="gym"
                                            value={0}
                                            onChange={handleChange}
                                            checked={values.gym === '0'}
                                        />
                                        <label className="form-check-label">No</label>
                                    </div>
                                </div>
                            </div><hr/>

                            <p>ID de Calendario sincronizado:</p>
                            <div className="row">
                                <div className="col-6">
                                    <input
                                        style={{width: "350px", height: "50px"}}
                                        value={values.id_calendar}
                                        type="text"
                                        name="id_calendar"
                                        onChange={handleChange}
                                        placeholder="id del calendario"
                                        required
                                    />
                                </div>
                            </div>


                    </div>
                    </div>
                    <BtnSave
                        data={dpto}
                        values={values}
                        imgPrincipal={file}
                        addGallery={gallery}
                        addPlans={plans}
                        plansDelete={plansDelete}
                        galleyDelete={galleyDelete}
                    />
                    <div className={styles.btn_close}>
                        <button onClick={btn_close}>Salir</button>
                    </div>
                </form>
            </div>

        </>
    )
}
