import React from 'react'
import imgMain from '../../../assets/img/chef.svg'
import './index.css'

const IndexSection = () => {

    return (
        <div>
            <div className="about">
                <div className="textAbout">
                    <h2>Farofinha, o local para voce guardar suas receitas familiares</h2>
                </div>
                <div className="imgAbout">
                    <img src={imgMain} alt="img do chef" />
                </div>
            </div>
            <div className="info">
                <div className="card">
                    <div className="icon">
                        <i className="fa fa-cutlery"></i></div>
                    <div className="description">
                        <p>Aqui suas receitas ficam guardadas pra sempre
              </p>
                    </div>
                </div>
                <div className="card">
                    <div className="icon"><i className="fa fa-search"></i></div>
                    <div className="description">
                        <p>Procure receitas de outras pessoas que voce tenha interesse</p>
                    </div>
                </div>
                <div className="card">
                    <div className="icon"><i className="fa fa-star"></i></div>
                    <div className="description">
                        <p>Salve suas receitas como favoritas para ter acesso mais tarde</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default IndexSection