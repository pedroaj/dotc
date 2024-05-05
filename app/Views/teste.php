<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

<form>
  <input id="value" type="text" value="a"/>
  <input id="double" type="button" value="Double"/>
</form>

<script>

function setup()
{
  $("#double").click(function()
  {
    var current_value = $("#value").val();

    alert("current_value: "+current_value);

    //if(!Number.isInteger(current_value))
    if(isNaN(current_value))
    {
    	alert("Value is not numeric!");
      $("#value").val("1");
      return true;
    }
    else
    {
    	alert("Value is numeric, will double...");
      current_value = (parseInt(current_value) * 2);
      $("#value").val(current_value);
    }
  });
}

setup();

//$("#double").click();
console.log($("#value").val());

</script>
