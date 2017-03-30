module.exports = {
  "wrapper":{
    "style":{}
  },
  "container":{
    "style":{ }
  },
  "layout":{
    "component":"Menu",
    "props":{
      "style":{}
    },
    "children": [
      {
        component: "SubMenuLinks",
        children: [
          {
            "component":"MenuLabel",
            "children":"Error log"
          },
          {
            "component":"MenuAppLink",
            "props":{
              "href":"/contentlog/standard/dbloggers",
              "label":"Error Log",
              "id": "dbloggers"
            }
          }
          // {
          //   "component":"MenuList",
          //   "children":[
          //     {
          //       "component":"MenuAppLink",
          //       "props":{
          //         "href":"/contentlog/standard/dbloggers",
          //         "label":"Error Log",
          //         "id": "dbloggers"
          //       }
          //     }
          //   ]
          // },
        ]
      },
    ]
  }
}