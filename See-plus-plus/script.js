
var fromjson = fetch("http://127.0.0.1:6400/flights")
.then(res => res.json())
.then(data => {
    fromjson = data;

})
.catch(err => {
    console.log("error " + err)
}); ;



$(document).ready(function(e) {

    $("#customRadioInline1").click(function(){
          document.getElementById("payment-div").classList.remove("test")
      });
  
      $("#customRadioInline2").click(function(){
          document.getElementById("payment-div").classList.remove("test")
      });
  
      $("#customRadioInline3").click(function(){
          document.getElementById("payment-div").classList.remove("test")
      });
    $('#submit-btn').click(function(event){
       
    var algo = document.getElementsByName("customRadioInline1");
    var email = document.myform.email.value;
    var name = document.myform.name.value;
    var id = document.myform.id.value;
    var day = document.myform.day.value;
    var month = document.myform.month.value;
    var destination;
    var hotelname;
    var hoteladdress;
    var object;
  
    var choice;

    for (var i = 0; i < algo.length; i++) {
        if (algo[i].checked) {
            choice = algo[i].value;
        }
    }
   
console.log($('#form-div').submit)
    
    for (var i = 0; i < fromjson.length; i++) {
        var newjson = fromjson[i].datego.split("/");
        var jsonday = newjson[1];
        var jsonmonth = newjson[0];

        
        if (fromjson[i].price == choice && day >= 1  && day <= jsonday && month == jsonmonth) {
            object = fromjson[i];
            
            break;
        }

        if (fromjson[i].price == choice && day >= 15  && day <= jsonday && month == jsonmonth) {
            object = fromjson[i];
            break;        
        }
        console.log(email);
        console.log(name);
    }
  
    

    fetch("http://localhost:6400/email", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            object: object



        })
    })
       });
})

