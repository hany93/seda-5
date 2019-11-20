import React from "react";
// @material-ui/core components
// core components
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import avatar from "assets/img/reactlogo.png";
import { Link } from "react-router-dom";

export default function AcercaDe(props) {  
  React.useEffect(() => {
    props.setLoading(true)
  },
    []
  );
  return (
    <div>
      <Card profile>
        <CardAvatar profile>
          <Link to="/admin/Dashboard">
            <img src={avatar} alt="Inicio" title='Inicio'/>
          </Link>
        </CardAvatar>
        <CardBody profile>
          <h6>Versión 1.0</h6>
          <h2 >SedA | Sistema Estadístico para la toma de Decisiones de la Agricultura</h2>
          <h4 >Desarrollado X Grupo Geomática ENPA UEB VC 2019</h4>
        </CardBody>
      </Card>
    </div>
  );
}
