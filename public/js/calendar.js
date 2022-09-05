document.addEventListener('DOMContentLoaded', function() {

    let form = document.querySelector('.calendar_form');
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'dayGridMonth',

        locale: 'es',

        displayEventTime: false,

        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        },

        //events: 'http://localhost/calendar/public/agenda/mostrar',
        eventSources:{
            url: baseURL+'/agenda/mostrar',
            method: 'POST',
            extraParams: {
                _token: form._token.value,
            }
        },

        dateClick: function(info){
            form.reset();
            form.start.value = info.dateStr;
            form.end.value = info.dateStr;
            $('#event').modal('show');
        },

        eventClick: function (info) {

            var event = info.event;

            axios.post(baseURL+"/agenda/editar/"+info.event.id).
            then(
                (answer)=>{
                    form.id.value = answer.data.id;
                    form.title.value = answer.data.title;
                    form.description.value = answer.data.description;
                    form.start.value = answer.data.start;
                    form.end.value = answer.data.end;
                    $("#event").modal("show");
                }
                ).catch(error=>{if(error.response){console.log(error.response.data);}})

        }

    });

    calendar.render();
    //Add event
    document.getElementById('btnGuardar').addEventListener('click', function(){
        sendData('/agenda/agregar');
    });
    //Update event
    document.getElementById('btnModificar').addEventListener('click', function(){
        sendData('/agenda/actualizar/'+form.id.value);
    });
    //Destroy event
    document.getElementById('btnEliminar').addEventListener('click', function(){
        sendData('/agenda/borrar/'+form.id.value);
    });
    //Recycle code
    function sendData(url){
        const newUrl = baseURL+url;
        const data = new FormData(form);
        axios.post(newUrl, data).
        then(
            (answer)=>{
                calendar.refetchEvents();
                $("#event").modal("hide");
            }
            ).catch(
                error=>{if(error.response){console.log(error.response.data);}}
            )
    }
});
