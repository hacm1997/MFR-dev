import styles from "./styles.module.css";
import InputImput from "./inputImput";
import React from "react";

export default function PhotosSalesApto(props:any){

    return(
        <>
            <div>

                <p><strong>Planos</strong></p>
                <div className={"row "+styles.images}>

                    <div className="col-6">
                        <input type="file" name="plans" className="custom-file-input" id="inputFileMultiple"
                        required accept="image/*" multiple onChange={props.handlePlans}/>
                    </div>

                </div>

            </div>
        </>
    )
}
