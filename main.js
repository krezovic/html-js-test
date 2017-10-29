var dbObject;

function initDB()
{
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

  if (!window.indexedDB) {
    alert('Your browser does not support indexedDB');
    return;
  }

  var request = window.indexedDB.open("MojaBaza", 1);

  request.onerror = function(event)
  {
    alert('Error opening database');
  };

  request.onsuccess = function(event)
  {
    dbObject = request.result;
  };

  request.onupgradeneeded = function(event)
  {
    var localDB = event.target.result;

    var objectStore_forms = localDB.createObjectStore("forms", {keyPath: "form_name"});
    var objectStore_forms_data = localDB.createObjectStore("forms_data", {keyPath: "form_name_version"});
  };
}

function readDB(store, value)
{
  var transaction = dbObject.transaction([store]);
  var objectStore = transaction.objectStore(store);
  var request = objectStore.get(value);

  request.onerror = function(event)
  {
    alert('Unable to retrieve data from database!');
  };

  return request;
}

function addToDB(store, value)
{
  var transaction = dbObject.transaction([store], "readwrite");
  var objectStore = transaction.objectStore(store);
  var request = objectStore.put(value);

  request.onerror = function(event)
  {
    alert('Unable to add data to database!');
  };

  request.onsuccess = function(event)
  {
  };
}

function renderFormsTab()
{
  resetHTML();

  var dynamicHTML = '      <p style="width: 20%;">' +
                    '        <span>Form name</span><br />' +
                    '        <input type="text" style="width: 100%" id="UserForm_Name"/>' +
                    '      </p>' +
                    '      <p style="width: 20%; padding-left: 10px;">' +
                    '        <span>Version</span><br />' +
                    '        <input type="text" style="width: 100%" id="UserForm_Version"/>' +
                    '      </p>' +
                    '      <p class="addbutton">' +
                    '        <span style="visibility: hidden;">Placeholder</span>' +
                    '        <input type="button" value="Search" onclick="findUserForm();" />' +
                    '      </p>';

  document.getElementById('Search_Div').innerHTML = dynamicHTML;
}

function renderAdminTab()
{
  resetHTML();

  var dynamicHTML = '      <p style="width: 20%;">' +
                    '        <span>Form name</span><br />' +
                    '        <input type="text" style="width: 100%" id="Form_Name" />' +
                    '      </p>' +
                    '      <p class="addbutton">' +
                    '        <span style="visibility: hidden;">Placeholder</span>' +
                    '        <input type="button" value="Search" onclick="searchForm();" />' +
                    '      </p>';

  document.getElementById('Search_Div').innerHTML = dynamicHTML;
}

function resetHTML()
{
  userForm = [];
  fieldCount = 1;
  document.getElementById('Main_Div').innerHTML = '';
  document.getElementById('Submit_Div').innerHTML = '';
}

function initSite()
{
  initDB();
  renderAdminTab();
}
