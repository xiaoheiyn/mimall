import Mock from 'mockjs'
Mock.mock('api/products', {
    "status": 0,
    "data": {
        "pageNum": 1,
        "pageSize": 10,
        "size": 2,
        "orderBy": null,
        "startRow": 1,
        "endRow": 2,
        "total": 2,
        "pages": 1,
        "list": [
            {
                "id": 1,
                "categoryId": 3,
                "name": "iphone7",
                "subtitle": "双十一促销",
                "mainImage": "mainimage.jpg",
                "status": 1,
                "price": 7199.22
            },
            {
                "id": 2,
                "categoryId": 2,
                "name": "oppo R8",
                "subtitle": "oppo促销进行中",
                "mainImage": "mainimage.jpg",
                "status": 1,
                "price": 2999.11
            }
        ],
        "firstPage": 1,
        "prePage": 0,
        "nextPage": 0,
        "lastPage": 1,
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": false,
        "hasNextPage": false,
        "navigatePages": 8,
        "navigatepageNums": [
            1
        ]
    }
})
