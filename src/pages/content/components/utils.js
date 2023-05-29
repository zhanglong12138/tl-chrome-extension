// import chrome from 'chrome'
function getIStorageSync(key){
  return new Promise((resolve,reject)=>{
    chrome.storage.local.get([`${key}`], function(e) {
      resolve(e?.[key] || null)
    });
  })
}

function setIStorageSync(key,value){
  return new Promise((resolve,reject)=>{
    chrome.storage.local.set({[key+'']:value}, function(e) {
      resolve(true)
    });
  })
}

function removeIStorageSync(key){
  return new Promise((resolve,reject)=>{
    chrome.storage.local.remove([`${key}`], function(e) {
      resolve(true)
    });
  })
}

function postx(data) {
  return  new Promise((resolve,reject)=>{
    var formData = new FormData();
    for (var i in data) {
      formData.append(i, data[i]);
    }
    var xhr = new XMLHttpRequest();
    xhr.open("post", "http://blog.zxlucky.com/interface/");
    xhr.send(formData);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          return resolve(JSON.parse(xhr.responseText))
        } else {
          let callbacktxt;
          try {
            callbacktxt = JSON.parse(xhr.responseText)
          } catch (errortxt) {
            callbacktxt = errortxt
          }
          reject(callbacktxt)
        }
      }
    }
  })
}

export {
  getIStorageSync,
  setIStorageSync,
  removeIStorageSync,
  postx
}