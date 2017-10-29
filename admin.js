var fieldCount = 1;
var radioMap = new Object();

function createFormElement()
{
  var parentNode = document.getElementById("Main_Div");
  var newElement = document.createElement("div");

  newElement.setAttribute("style", "width: 100%;");
  newElement.setAttribute("id", "Region" + fieldCount + "_Main");

  var dynamicHTML = '      <div id="Region' + fieldCount + '_Fields" style="display: flex; flex-flow: row nowrap;">' +
                    '        <p class="paragraph" id="Region' + fieldCount + '_Paragraph1">' +
                    '          <span>Element ' + fieldCount + '</span><br />' +
                    '          <input type="text" style="width: 100%" id="Field' + fieldCount + '_ElementName"/>' +
                    '        </p>' +
                    '        <p class="paragraph" id="Region' + fieldCount + '_Paragraph2">' +
                    '          <span>Input type</span><br />' +
                    '          <select style="width: 100%" id="Field' + fieldCount + '_Type" onchange="handleInputType(' + fieldCount + ');">' +
                    '            <option value="text" selected="selected">Textbox</option>' +
                    '            <option value="checkbox">Checkbox</option>' +
                    '            <option value="radio">Radio button</option>' +
                    '          </select>' +
                    '        </p>' +
                    '        <p class="paragraph" id="Region' + fieldCount + '_Paragraph4">' +
                    '          <span>Validation type</span><br />' +
                    '            <select style="width: 100%" id="Field' + fieldCount + '_ValidationType">' +
                    '            <option value="mandatory" selected="selected">Mandatory</option>' +
                    '            <option value="numeric">Numeric</option>' +
                    '            <option value="none">None</option>' +
                    '          </select>' +
                    '        </p>' +
                    '        <p class="addbutton" id="Region' + fieldCount + '_AddButton">' +
                    '          <span style="visibility: hidden;">Placeholder</span>' +
                    '          <input type="button" value="Add" onclick="createFormElement();" />' +
                    '        </p>' +
                    '      </div>';

  newElement.innerHTML = dynamicHTML;

  parentNode.appendChild(newElement);

  if (fieldCount != 1)
  {
    var oldAddID = document.getElementById('Region' + (fieldCount - 1) + '_AddButton');

    oldAddID.style.visibility = 'hidden';
  }

  radioMap["Region" + fieldCount] = 0;

  fieldCount++;
}

function insertAdditional(regionID)
{
  var parentNode1 = document.getElementById('Region' + regionID + '_Main');
  var parentNode2 = document.getElementById('Region' + regionID + '_Fields');
  var oldNode = document.getElementById('Region' + regionID + '_Paragraph4');

  document.getElementById('Region' + regionID + '_Paragraph1').style.width = '22.5%';
  document.getElementById('Region' + regionID + '_Paragraph2').style.width = '22.5%';
  document.getElementById('Region' + regionID + '_Paragraph4').style.width = '22.5%';

  var newElement1 = document.createElement("p");
  var newElement2 = document.createElement("p");

  newElement1.setAttribute("class", "paragraph");
  newElement1.setAttribute("style", "width: 22.5%;");
  newElement1.setAttribute("id", "Region" + regionID + "_Paragraph3");

  newElement2.setAttribute("class", "additional");
  newElement2.setAttribute("id", "Region" + regionID + "_Additional");

  var dynamicHTML = '        <span>No. of radio opts</span><br />' +
                    '        <input type="text" value="2" style="width: 100%" id="Field' + regionID + '_RadioCount" onchange="modifyAdditional(' + regionID + ');" />';

  parentNode2.insertBefore(newElement1, oldNode);

  newElement1.innerHTML = dynamicHTML;

  var dynamicHTML2 = '        <span>Option 1<br />' +
                     '        <input type="text" style="width: 100%" id="Field' + regionID + '_AdditionalInput1" /></span><br />' +
                     '        <span>Option 2<br />' +
                     '        <input type="text" style="width: 100%" id="Field' + regionID + '_AdditionalInput2" /></span><br />';

  newElement2.innerHTML = dynamicHTML2;

  parentNode1.appendChild(newElement2);

  radioMap["Region" + regionID] = 2;
}

function removeAdditional(regionID)
{
  var parentNode1 = document.getElementById('Region' + regionID + '_Fields');
  var parentNode2 = document.getElementById('Region' + regionID + '_Main');
  var childNode1 = document.getElementById('Region' + regionID + '_Paragraph3');
  var childNode2 = document.getElementById('Region' + regionID + '_Additional');

  if (childNode1 && childNode2)
  {
    parentNode1.removeChild(childNode1);
    parentNode2.removeChild(childNode2);

    document.getElementById('Region' + regionID + '_Paragraph1').style.width = '30%';
    document.getElementById('Region' + regionID + '_Paragraph2').style.width = '30%';
    document.getElementById('Region' + regionID + '_Paragraph4').style.width = '30%';
  }

  radioMap["Region" + regionID] = 0;
}

function insertAdditionalOption(regionID)
{
  var parentNode = document.getElementById('Region' + regionID + '_Additional');
  var CurrentCount = radioMap["Region" + regionID] + 1;

  var newElement = document.createElement("span");
  var newElement2 = document.createElement("br");

  newElement.setAttribute("id", "Region" + regionID + "_Additional_Span" + CurrentCount);
  newElement2.setAttribute("id", "Region" + regionID + "_Additional_Br" + CurrentCount);

  var dynamicHTML = '        Option ' + CurrentCount + '<br />' +
                    '        <input type="text" style="width: 100%" id="Field' + regionID + '_AdditionalInput' + CurrentCount +'" />';

  newElement.innerHTML = dynamicHTML;

  parentNode.appendChild(newElement);
  parentNode.appendChild(newElement2);

  radioMap["Region" + regionID]++;
}

function removeAdditionalOption(regionID, additionalID)
{
  var parentNode = document.getElementById('Region' + regionID + '_Additional');

  var childNode1 = document.getElementById('Region' + regionID + '_Additional_Span' + additionalID);
  var childNode2 = document.getElementById('Region' + regionID + '_Additional_Br' + additionalID);

  parentNode.removeChild(childNode1);
  parentNode.removeChild(childNode2);

  radioMap["Region" + regionID]--;
}

function modifyAdditional(regionID)
{
  var newCount = document.getElementById('Field' + regionID + '_RadioCount').value;
  var oldCount = radioMap["Region" + regionID];

  if (newCount == oldCount)
    return;

  if (newCount < 2)
  {
    alert('Number of radio elements must be greater than 2!');
    document.getElementById('Field' + regionID + '_RadioCount').value = oldCount;
    return;
  }

  while (newCount > oldCount)
  {
    insertAdditionalOption(regionID);
    oldCount++;
  }

  while (newCount < oldCount)
  {
    removeAdditionalOption(regionID, oldCount);
    oldCount--;
  }
}

function insertForm(formData)
{
  var cnt = 0;

  while (cnt < formData.name.length)
  {
    var localFormName = formData.name[cnt];
    var localFormType = formData.type[cnt];
    var localFormRadioCnt = formData.radio[cnt];
    var localFormValidation = formData.validation[cnt];
    var localFormRadioOpts = formData.radioOptions[cnt];

    createFormElement();

    document.getElementById('Field' + (cnt + 1) + '_ElementName').value = localFormName;
    document.getElementById('Field' + (cnt + 1) + '_Type').value = localFormType;
    document.getElementById('Field' + (cnt + 1) + '_ValidationType').value = localFormValidation;

    if (localFormType == "radio")
    {
      insertAdditional(cnt + 1);
      document.getElementById('Field' + (cnt + 1) + '_RadioCount').value = localFormRadioCnt;
      modifyAdditional(cnt + 1);

      var cnt2 = 1;
      while (cnt2 <= localFormRadioCnt)
      {
        document.getElementById('Field' + (cnt + 1) + '_AdditionalInput' + cnt2).value = localFormRadioOpts[cnt2 - 1];
        cnt2++;
      }
    }

    cnt++;
  }
}

function searchForm()
{
  var formName = document.getElementById('Form_Name').value;

  if (!formName)
  {
    alert('Error: You need to specify form name!');
    return;
  }

  var request = readDB('forms', formName);

  resetHTML();

  request.onsuccess = function(event)
  {
    if (request.result)
    {
      insertForm(request.result);
    } else {
      createFormElement();
    }
  };

  document.getElementById('Submit_Div').innerHTML = '<input type="button" value="Save Changes" onclick="submitData();" />';
}

function handleInputType(regionID)
{
  var selectedType = document.getElementById('Field' + regionID + '_Type');
  var selectedValue = selectedType.options[selectedType.selectedIndex].value;

  if (selectedValue == "radio")
  {
    insertAdditional(regionID);
    return;
  }

  removeAdditional(regionID);
}

function submitData()
{
  var formName = document.getElementById('Form_Name').value;

  var nameValues = new Array(fieldCount - 1);
  var typeValues = new Array(fieldCount - 1);
  var validationValues = new Array(fieldCount - 1);

  var radioValues = new Array(fieldCount - 1);
  var radioOptionsValues = new Array(fieldCount - 1);

  var cnt = 1;

  while (cnt < fieldCount)
  {
    var localTypeRoot = document.getElementById('Field' + cnt + '_Type');
    var localValidationRoot = document.getElementById('Field' + cnt + '_ValidationType');

    var localName = document.getElementById('Field' + cnt + '_ElementName').value;
    var localType = localTypeRoot.options[localTypeRoot.selectedIndex].value;
    var localValidation = localValidationRoot.options[localValidationRoot.selectedIndex].value;
    var localRadio;
    var localRadioMap = [];

    if (!localName || localName == "")
    {
      alert('Element ' + cnt + ' must have a name!');
      return;
    }

    nameValues[cnt - 1] = localName;
    typeValues[cnt - 1] = localType;
    validationValues[cnt - 1] = localValidation;

    radioValues[cnt - 1] = 0;
    radioOptionsValues[cnt - 1] = 0;

    if (localType == "radio")
    {
      localRadio = document.getElementById('Field' + cnt + '_RadioCount').value;

      var cnt2 = 1;
      while (cnt2 <= localRadio)
      {
        localRadioMap[cnt2 - 1] =  document.getElementById('Field' + cnt + '_AdditionalInput' + cnt2).value;
        if (!localRadioMap[cnt2 - 1] || localRadioMap[cnt2 - 1] == "")
        {
          alert('Radio option ' + cnt2 + ' must be specified!');
          return;
        }

        radioValues[cnt - 1] = localRadio;
        radioOptionsValues[cnt - 1] = localRadioMap;

        cnt2++;
      }
    }

    cnt++;
  }

  var final = {form_name: formName, name: nameValues, type: typeValues, validation: validationValues, radio: radioValues, radioOptions: radioOptionsValues };

  addToDB("forms", final);
}
