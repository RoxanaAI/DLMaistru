// import React from 'react';
// import Worker from './Worker';

// export default class WorkerList extends React.Component {
//     state = {
//         workers: []
//     };

//     // Lifecycle Methods
//     async componentDidMount() {
//         const workers = await fetch('https://games-app-siit.herokuapp.com/games').then(res => res.json());
//         this.setState({
//             workers
//         });
//     }

//     componentWillUnmount() {
//         // cleanup
//     }

//     render() {
//         const { workers } = this.state;
//         if(!workers.length) {
//             return 'Loading ...';
//         }

//         return (
//             <>
//                 <h1>Workers</h1>
//                 <dl>
//                     { workers.map(worker => <Worker worker={worker} />) }
//                 </dl>
//             </>
//         );
//     }
// }