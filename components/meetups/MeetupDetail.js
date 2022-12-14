import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  return (
    <Fragment>
      <section className={classes.detail}>
        <img src={props.image} alt={props.title} />
        <h2>{props.title}</h2>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </Fragment>
  );
};

export default MeetupDetail;
