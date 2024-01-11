// {
//     "pageNum": 1,
//     "pageSize": 10,
//     "total": 1,
//     "list": [
//         {
//             "contentId": 1578763,
//             "parentId": 1578762,
//             "title": "图片1.png",
//             "contentType": 3,
//             "type": 1,
//             "mimeType": "png",
//             "contentSize": 78131,
//             "location": "https://obscloud.ulearning.cn/resources/web/17048739804695151.png",
//             "remark": "76.3KB",
//             "remark2": "1",
//             "remark3": "0",
//             "isView": "0",
//             "publishTimes": 0,
//             "viewTimes": 0,
//             "downloadTimes": 0,
//             "growth": 0,
//             "createDate": 1704873983000,
//             "relationId": 0
//         }
//     ]
// }

export interface ListInfo {
    pageNum: number;
    pageSize: number;
    total: number;
    list: FileInfo[];
}

export interface FileInfo {
    contentId: number;
    orgID: number;
    score: number;
    contentType: number;
    type: number;
    title: string;
    languageID: number;
    status: string;
    mimeType: string;
    contentSize: number;
    location: string;
    typicallEarningTime: number;
    userID: number;
    creator: string;
    contentTypeID: number;
    courseContentTypeID: number;
    downloadTimes: number;
    createDate: number;
    lastModDate: number;
    remark: string;
    remark1: string;
    remark2: string;
    remark3: string;
    orderIndex: number;
    isView: string;
    depth: number;
    parentID: number;
    relationID: number;
    currentPublish: number;
    publishTimes: number;
    viewTimes: number;
    growth: number;
    isdelete: number;
}

// {
//     "contentId": 1578811,
//     "orgID": 3755,
//     "score": 0.0,
//     "contentType": 3,
//     "type": 1,
//     "title": "图片1(1).png",
//     "languageID": 0,
//     "status": "4",
//     "mimeType": "png",
//     "contentSize": 78131,
//     "location": "https://obscloud.ulearning.cn/resources/web/17049487646424400.png",
//     "typicallEarningTime": 0,
//     "userID": 12997777,
//     "creator": "12997777",
//     "contentTypeID": 0,
//     "courseContentTypeID": 0,
//     "downloadTimes": 0,
//     "createDate": 1704948770000,
//     "lastModDate": 1704948770000,
//     "remark": "76.3KB",
//     "remark1": "图片1(1).png",
//     "remark2": "1",
//     "remark3": "0",
//     "orderIndex": 0,
//     "isView": "0",
//     "depth": 0,
//     "parentID": 1578762,
//     "relationID": 0,
//     "currentPublish": 0,
//     "publishTimes": 0,
//     "viewTimes": 0,
//     "growth": 0,
//     "isdelete": 0
// }