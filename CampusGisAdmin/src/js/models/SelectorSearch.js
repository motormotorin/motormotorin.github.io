export default class SelectorSearch {
    constructor(searchType) {
        this.searchType = searchType;
    }

    async getLayers() {

        // check searchType and load appropriate layers
        try {
            // const marketsLayer = {
            //     id: 12441,
            //     name: "Продуктовые магазины",
            //     markers: [
            //         {
            //             "id": 1,
            //             "name": "Minimarket",
            //             "description": "продуктовый магазин",
            //             "address": {
            //                 "building": "B",
            //                 "level": 6
            //             },
            //             "worktime": {
            //                 "weekdays": "9:00 - 17:30", 
            //                 "weekends": "выходной"
            //             },
            //             "coords": { 
            //                 "lat": 113.141313141,
            //                 "lng": 12.190120441
            //             }
            //         },
            //         {
            //             "id": 2,
            //             "name": "Minimarket",
            //             "description": "продуктовый магазин",
            //             "address": {
            //                 "building": "8.1",
            //                 "level": 5
            //             },
            //             "worktime": {
            //                 "weekdays": "9:00 - 17:30", 
            //                 "weekends": "выходной"
            //             },
            //             "type": "POINT",
            //             "coords": { 
            //                 "lat": 113.141313141,
            //                 "lng": 12.190120441
            //             }
            //         }
            //     ]
            // }

            return [];

        } catch (error) {
            alert(error);
        }
    }
}