var userForm = [];

function populateUserFields(userData)
{
  var cnt = 0;

  while (cnt < userData.length)
  {
    var localType = userForm[cnt].type;
    var field = document.getElementsByName('userFormField' + (cnt + 1));

    if (localType == "text")
      field[0].value = userData[cnt];
    else if (localType == "checkbox")
      field[0].checked = userData[cnt];
    else if (localType == "radio")
    {
      field_no = userData[cnt];
      if (field_no <= field.length)
        field[field_no - 1].checked = true;
    }

    cnt++;
  }
}

function insertUserForm(formData)
{
  var formName = document.getElementById('UserForm_Name').value;
  var formVersion = document.getElementById('UserForm_Version').value;

  var cnt = 0;
  var parentNode = document.getElementById("Main_Div");
  var newElement;

  while (cnt < formData.name.length)
  {
    var localFormName = formData.name[cnt];
    var localFormType = formData.type[cnt];
    var localFormRadioCnt = formData.radio[cnt];
    var localFormValidation = formData.validation[cnt];
    var localFormRadioOpts = formData.radioOptions[cnt];

    userForm[cnt] = { name: localFormName, type: localFormType, validation: localFormValidation };

    dynamicHTML = '<span>' + localFormName + '</span><br />';

    if (localFormType == "radio")
    {
      var cnt2 = 1;
      while (cnt2 <= localFormRadioCnt)
      {
        localFormRadioOpts[cnt2 - 1];
        dynamicHTML +=  '<input type="radio" name="userFormField' + (cnt + 1) + '" value="userFormField' + (cnt + 1) + 'value' + cnt2 + '" />' + localFormRadioOpts[cnt2 - 1] + '<br />';
        cnt2++;
      }
    } else {
        dynamicHTML +=  '<input type="' + localFormType + '" name="userFormField' + (cnt + 1) + '" /><br />';
    }

    newElement = document.createElement("p");
    newElement.setAttribute("style", "padding-left: 10px;");

    newElement.innerHTML = dynamicHTML;

    parentNode.appendChild(newElement);

    cnt++;
  }

  if (!formVersion)
    return;

  var request = readDB('forms_data', formName + formVersion);

  request.onsuccess = function(event)
  {
    if (request.result)
    {
     populateUserFields(request.result['user_data']);
    } 
  };
}

function findUserForm()
{
  var formName = document.getElementById('UserForm_Name').value;
  var formVersion = document.getElementById('UserForm_Version').value;

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
      insertUserForm(request.result);
      document.getElementById('Submit_Div').innerHTML = '<input type="button" value="Save Changes" onclick="submitUserData();" />';
    } else {
      alert('Form "' + formName + '" does not exist');
    }
  };
}

function findCheckedRadio(radioElement)
{
  var found = null;

  for (var i = 0; i < radioElement.length; i++)
  {
    if (radioElement[i].checked)
    {
      found = i + 1;
      break;
    }
  }

  return found;
}

function handleUserInput(formName, formVersion)
{
  var cnt = 0;
  var userData = new Array(userForm.length);

  while (cnt < userForm.length)
  {
    var field = document.getElementsByName('userFormField' + (cnt + 1));
    var fieldVal;

    if (userForm[cnt].type == "text")
    {
      fieldVal = field[0].value;
    } else if (userForm[cnt].type == "checkbox")
    {
      fieldVal = field[0].checked;
    } else if (userForm[cnt].type == "radio")
    {
      fieldVal = findCheckedRadio(field);
    }

    if ((userForm[cnt].validation == "mandatory") && (userForm[cnt].type != "checkbox") && !fieldVal)
    {
      alert('Field ' + userForm[cnt].name + ' is required');
      return;
    }

    if ((userForm[cnt].validation == "numeric") && (userForm[cnt].type == "text") && fieldVal && !(/^\d+$/.test(fieldVal)))
    {
      alert('Field ' + userForm[cnt].name + ' must have numeric value');
      return;
    }

    userData[cnt] = fieldVal;

    cnt++;
  }

  var final = { form_name_version: formName + formVersion, user_data: userData };

  addToDB("forms_data", final);
}

function submitUserData()
{
  var formName = document.getElementById('UserForm_Name').value;
  var formVersion = document.getElementById('UserForm_Version').value;

  if (!formVersion)
  {
    alert('What version?');
    return;
  }

  handleUserInput(formName, formVersion);
}
