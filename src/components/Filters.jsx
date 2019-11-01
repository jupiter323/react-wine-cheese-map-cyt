import React from 'react'

export default class Filters extends React.Component {

    constructor(props) {
        super(props);
    }

    handleCheck = e => {
        const { filterQuery } = this.props
        const field = e.target.name
        const checked = e.target.checked
        filterQuery[field] = checked
        this.props.handleShowcheckState()

    }

    render() {
        return (
            <div className="filters">
                <div className="filterset-section-title">Cheese</div>

                <div className="filtersets">
                    <div className="filterset">
                        <div className="filterset-title">Moisture</div>
                        <input id="soft" name="soft" type="checkbox" checked={this.props.filterQuery.soft} onChange={this.handleCheck} /><label htmlFor="soft">Soft</label><br />
                        <input id="semi-soft" name="semiSoft" type="checkbox" checked={this.props.filterQuery["semiSoft"]} onChange={this.handleCheck} /><label htmlFor="semi-soft">Semi-soft</label><br />
                        <input id="semi-hard" name="semiHard" type="checkbox" checked={this.props.filterQuery["semiHard"]} onChange={this.handleCheck} /><label htmlFor="semi-hard">Semi-hard</label><br />
                        <input id="hard" name="hard" type="checkbox" checked={this.props.filterQuery.hard} onChange={this.handleCheck} /><label htmlFor="hard">Hard</label><br />
                        <input id="na" name="na" type="checkbox" checked={this.props.filterQuery.na} onChange={this.handleCheck} /><label htmlFor="na">Other</label><br />
                    </div>
                    <div className="filterset right">
                        <div className="filterset-title">Country</div>
                        <input id="chs-en" name="chsEn" type="checkbox" checked={this.props.filterQuery["chsEn"]} onChange={this.handleCheck} /><label htmlFor="chs-en">England</label><br />
                        <input id="chs-fr" name="chsFr" type="checkbox" checked={this.props.filterQuery["chsFr"]} onChange={this.handleCheck} /><label htmlFor="chs-fr">France</label><br />
                        <input id="chs-it" name="chsIt" type="checkbox" checked={this.props.filterQuery["chsIt"]} onChange={this.handleCheck} /><label htmlFor="chs-it">Italy</label><br />
                        <input id="chs-usa" name="chsUsa" type="checkbox" checked={this.props.filterQuery["chsUsa"]} onChange={this.handleCheck} /><label htmlFor="chs-us">USA</label><br />
                        <input id="chs-es" name="chsEs" type="checkbox" checked={this.props.filterQuery["chsEs"]} onChange={this.handleCheck} /><label htmlFor="chs-es">Spain</label><br />
                        <input id="chs-ch" name="chsCh" type="checkbox" checked={this.props.filterQuery["chsCh"]} onChange={this.handleCheck} /><label htmlFor="chs-ch">Switzerland</label><br />
                        <input id="chs-euro" name="chsEuro" type="checkbox" checked={this.props.filterQuery["chsEuro"]} onChange={this.handleCheck} /><label htmlFor="chs-euro">Other Europe</label><br />
                        <input id="chs-nworld" name="chsNworld" type="checkbox" checked={this.props.filterQuery["chsNworld"]} onChange={this.handleCheck} /><label htmlFor="chs-nworld">Other New World</label><br />
                        <input id="chs-na" name="chsNa" type="checkbox" checked={this.props.filterQuery["chsNa"]} onChange={this.handleCheck} /><label htmlFor="chs-na">Other</label><br />
                    </div>
                </div>

                <div className="filterset-section-title">Drink</div>

                <div className="filtersets">
                    <div className="filterset">
                        <input id="white" name="white" type="checkbox" checked={this.props.filterQuery.white} onChange={this.handleCheck} /><label htmlFor="white">White wine</label><br />
                        <input id="red" name="red" type="checkbox" checked={this.props.filterQuery.red} onChange={this.handleCheck} /><label htmlFor="red">Red wine</label><br />
                        <input id="cider" name="cider" type="checkbox" checked={this.props.filterQuery.cider} onChange={this.handleCheck} /><label htmlFor="cider">Cider</label>
                    </div>
                </div>

            </div>
        )
    }
}