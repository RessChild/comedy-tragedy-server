// 샘플용 포스트 값
const boardListData = [
    {
        id: 1,
        title: '제목1',
        date: '',
        category: '',
    },
    {
        id: 2,
        title: '제목2',
        date: '',
        category: '',
    },
    {
        id: 3,
        title: '제목3',
        date: '',
        category: '',
    },
];

const boardViewData = [
    {
        id: 1,
        userId: 'test',
        title: '제목1',
        date: '',
        category: '',
        content: '',
        comment: [
        {id: 1, userId: 'test', content: '댓글내용1', subComment: [{}]},
        {id: 2, userId: 'test', content: '댓글내용2', subComment: [{}]},
        ],
    },
];

module.exports = { 
    boardListData, boardViewData,
}