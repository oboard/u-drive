// [
//     {
//         "son": [
//             {
//                 "son": [],
//                 "id": 1578815,
//                 "title": "ha"
//             }
//         ],
//         "id": 1578762,
//         "title": "drive"
//     }
// ]

export default interface Folder {
    id: number;
    title: string;
    son: Folder[];
}