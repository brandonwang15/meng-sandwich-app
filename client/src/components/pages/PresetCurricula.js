import React, { Component } from "react";

import curricula_presets from '../../data/preset_curricula';
import data from "../../data/all_modules"

import Sandwich from "../modules/Sandwich";
import AppContext from "../context/app_context";

import { Link } from "react-router-dom";

class PresetCurricula extends React.Component {

    getSandwichData(uid) {
        let sandwiches = data.all_modules;
        for (let i = 0; i < sandwiches.length; i++) {
            if (sandwiches[i].uid === uid) {
                return sandwiches[i];
            }
        }

        throw new Error("module uid not found in data! (uid: " + uid + ")");
    }

    getCurriculaData(module_uid) {
        let curricula = curricula_presets.curricula;
        for (let i = 0; i < curricula.length; i++) {
            if (curricula[i].uid === module_uid) {
                return curricula[i];
            }
        }

        throw new Error("curricula uid: not found in curricula_presets.js");
    }

    loadPresetCurriculaInUserCurricula(module_uid) {
        console.log("module_uid: " + module_uid);
        let presetCurricula = this.getCurriculaData(module_uid);

        // this.context.clearUserCurriculum();
        for (let i = 0; i < presetCurricula.sequence.length; i++) {
            // for (let i = 0; i < 2; i++) {
            let sandwichUID = presetCurricula.sequence[i];
            console.log("Loading curricula preset uid=%s into slot=%s.", sandwichUID, i);
            this.context.updateSandwichInUserCurriculum(i, this.getSandwichData(sandwichUID))
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row Page-title">
                    <div className="col-sm">
                        <h1>Preset Curricula</h1>
                    </div>
                </div>
                {curricula_presets.curricula.map((curricula) =>
                    <div key={curricula.uid}>
                        <div className="row">
                            <h3>{curricula.title}</h3>
                            <Link to="/builder">
                                <button
                                    className="btn btn-info"
                                    onClick={() => {
                                        this.loadPresetCurriculaInUserCurricula(curricula.uid);
                                    }}> Use this! </button>
                            </Link>
                        </div>
                        <div className="row">
                            {
                                curricula.sequence.map((uid) =>
                                    <div key={uid} className="col-sm-4">
                                        <Sandwich
                                            data={this.getSandwichData(uid)}
                                        />
                                    </div>)
                            }
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

PresetCurricula.contextType = AppContext;

export default PresetCurricula;