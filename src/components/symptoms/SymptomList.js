//component lists are symptoms added in the database that is associated with the logged in user
import React, { Component } from "react"
import SymptomCard from "./SymptomCard"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class SymptomList extends Component {

    state = {
        dropdownOpen: false,
        sortDate: false,
        sortName: false
    }

    getAllTrackedSymptoms = () => {
        this.props.getAll()
        .then(()=> {
            this.props.history.push("/track")
        })
    }

    toggle= ()=> {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

      sortByDateChange = () => {
          this.setState(() => ({
              sortDate: true,
              sortName: false
          }))
        }

        sortByNameChange = () => {
            this.setState(() => ({
                sortDate: false,
                sortName: true
            }))
        }

        sortByName = () => {
            let sortedSymps = this.props.symptoms.sort(function (sympA, sympB) {
                return (sympA.name.localeCompare(sympB.name))
            })
            return (
                <section>
                        {sortedSymps.map(symptom => (

                            <SymptomCard key={symptom.id} symptom={symptom} {...this.props} />

                        ))}
                </section>

            )

        }

        sortByDate = () => {
        let sortedSymps = this.props.symptoms.sort(function (sympA, sympB) {
            return new Date (sympB.date) - new Date(sympA.date)
        })

        return (
            <section>
                    {sortedSymps.map(symptom => (

                        <SymptomCard key={symptom.id} symptom={symptom} {...this.props} />

                    ))}
            </section>

        )
      }

    render() {
        console.log(this.state)
        return (
            <>
                <div>
                    <h2>Symptom List</h2>
                    <div className="symptomList">
                    <button type="submit" onClick={this.getAllTrackedSymptoms} >
                        Add
                </button>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} size="sm">
        <DropdownToggle className="symptom-dropdown"caret>
          Sort
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.sortByDateChange}>Sort by Date</DropdownItem>
          <DropdownItem onClick={this.sortByNameChange}>Sort by Name</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </div>
                </div>

                {this.state.sortDate === true ? this.sortByDate() : this.state.sortName === true ? this.sortByName() :
                <section>
                {this.props.symptoms.map(symptom => (

                    <SymptomCard key={symptom.id} symptom={symptom} {...this.props} />

                ))}
            </section>

                }

            </>
        )
    }
}