let family_api_array=[];
 function loadTree(selectedAPIs) {
          document.getElementById('family_tree').innerHTML = "";
           let full_family_api_mapping_tmp=[];
           // for (let i = 0; i < response.length; i++) {
           //     let apiId = response[i]["family_api_id"];
           //     let family_id=response[i]["family_id"];
           //     let family_value=response[i]["family_value"];
           //     let api=response[i]["api_name"];
           //     let family=response[i]["family"];
           //     let isDefault=response[i]["isdefault"];
           //     let f_item = {"family":family,"family_value":family_value,"apiId":apiId,"api":api,"isDefault":isDefault};
           //     full_family_api_mapping_tmp.push(f_item);
           // }

           full_family_api_mapping_tmp =
           [
           {"family":"AIML_Dialogflow","family_value":"aiml_dialogflow","apiId":1,"api":"aiml_api1","isDefault":"Y"},
           {"family":"AIML_Dialogflow","family_value":"aiml_dialogflow","apiId":2,"api":"aiml_api2","isDefault":"Y"},
           {"family":"AIML_Dialogflow","family_value":"aiml_dialogflow","apiId":3,"api":"aiml_api3","isDefault":"Y"},
           {"family":"GSuite","family_value":"gsuite","apiId":4,"api":"gsuite_api1","isDefault":"Y"},
           {"family":"GSuite","family_value":"gsuite","apiId":5,"api":"gsuite_api2","isDefault":"Y"},
           {"family":"Maps","family_value":"maps","apiId":6,"api":"maps_api1","isDefault":"Y"},
           {"family":"Maps","family_value":"maps","apiId":7,"api":"maps_api2","isDefault":"Y"},
           {"family":"Maps","family_value":"maps","apiId":8,"api":"maps_api3","isDefault":"Y"},
           {"family":"Others","family_value":"others","apiId":9,"api":"other_api1","isDefault":"Y"},
           ];
           //console.log("----------- full_family_api_mapping_tmp ---- "+JSON.stringify(full_family_api_mapping_tmp));
           family_api_array = full_family_api_mapping_tmp;
           assignvar(selectedAPIs);
   }



function makeOptions(apiArr){
   const tmpOptions = [];
   apiArr.map(arrItem => {
       const existOption = tmpOptions.find(tmpItem => tmpItem.name == arrItem.family);
       if(existOption){
           existOption.children.push({
               name: arrItem.api,
               value: arrItem.apiId,
               children: [],
           })
       }else{
           tmpOptions.push({
               name: arrItem.family,
               value: arrItem.family_value,
               children: [{
               name: arrItem.api,
               value: arrItem.apiId,
               children: [],
               }],
           })
       }

   })
   return tmpOptions;
};

function assignvar(selectedAPIs){
   const testOption = makeOptions(family_api_array);
    let defaultVals = [];
    window.treeRelatinVals = [];
    window.treeValues = defaultVals;
    selectedAPIs = (typeof selectedAPIs === 'undefined') ? [1,2,3] : selectedAPIs;
    let currentSelection =[];
    for (let i=0; i<testOption.length; i++){
        testOption[i].children.map(childItem =>{
         if(selectedAPIs.includes(childItem.value)){
                    defaultVals.push(childItem.value)
                    window.treeRelatinVals.push({
                        checked: true,
                        childOf: testOption[0].value,
                        hidden: true,
                        id: 1,
                        isClosed: false,
                        isGroup: false,
                        isPartialChecked: false,
                        level: 1,
                        name: childItem.value
                    })
         }
        });
    }


   const slot = document.createElement('div')
   slot.innerHTML = '<a class="test" href="">Add new element</a>'
   const domEl = document.querySelector('.family_tree')
   const treeselect = new Treeselect({
       parentHtmlContainer: domEl,
       value: defaultVals,
       options: testOption,
       alwaysOpen: false,
       showTags: true,
       appendToBody: true,
       listSlotHtmlComponent: null,
       disabled: false,
       isGroupedValue: false,
       expandSelected: true,
       isIndependentNodes: false,
       emptyText: 'No data text',
   })


   treeselect.srcElement.addEventListener('input', (e) => {
       console.log("getting Child Values", treeselect.value);
       window.treeValues = treeselect.value;
       console.log("Parent RelationData", e.detail, e);
       window.treeRelatinVals = e.detail;
   })

   treeselect.srcElement.addEventListener('close', (e) => {
       console.log('close', e);
     })
}