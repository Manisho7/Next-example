// import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

const HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  //effect function will always render after rendering the component first, i.e it takes 2 renders.
  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  // console.log(new Date().getTime());

  return (
    <Fragment>
      <Head>
        <title>Meetup List</title>
        <meta name="description" content="browse meetup list in react!" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

//This is used to pre-render the data on every http request unlike getStaticProps

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

//This reserved function will run before returning the JSX of the component page
//and will send the data via props to the component page which will help to pre-render
//the data before the component execution
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Manish:Wichita@cluster0.gxuaa.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          image: meetup.image,
          title: meetup.title,
          address: meetup.address,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 10,
  };
}

export default HomePage;
