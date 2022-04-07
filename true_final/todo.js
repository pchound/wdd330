window.onload = function()
{
    let task_array = getFromLocalStorage();
    rendertask_array(task_array);
}

let user_input = document.getElementById("user_input");
let task_list = document.getElementById("task_list");
let error = document.getElementById("error");

let complete_radio = document.getElementById("complete");
let incomplete_radio = document.getElementById("incomplete");
let all_radio = document.getElementById("all");

let task_array = [];

function delete_task(id)
{
    task_array = task_array.filter(function(task){
        return task.id != id;
});
    addToLocalStorage(task_array);
    rendertask_array(task_array);
}



document.getElementById("task_button").
    addEventListener("click", function()
        {

            if (complete_radio.checked)
            {
                error.innerHTML = "You can't add a new task while viewing completed ones"  
                return false;
            }


            if (user_input.value.length != 0) 
            {
                error.innerHTML = "";
                
                const task_object = 
                {
                    id: Date.now(),
                    content: user_input.value,
                    complete: false
                };

                task_array.push(task_object);
                addToLocalStorage(task_array); 

                user_input.value=""; 
                return true;

            }

            else 
            {
                error.innerHTML = "Cannot accept blank task"
                return false;
            }



        });
    



        function rendertask_array(task_array)
        {
            
            var retrievedData = localStorage.getItem("task_array");
            var retrieved_task = JSON.parse(retrievedData);
        
            render_tasks(retrieved_task);
            
        }

        function render_tasks(tasks)
        {
            task_list.innerHTML = "";



  


            tasks.forEach((task) => {
                if (task.complete == false)
                {
                    task_list.innerHTML += "<li class='task' id='" + task.id + "''>" + task.content + "<button class='close'>X</button>" + "</li>";
                }

                else
                {
                    task_list.innerHTML += "<li class='task checked' id='" + task.id + "''>" + task.content + "<button class='close'>X</button>" + "</li>";
                }


            });

            
                if (complete_radio.checked)
                {
                    filter_complete();
                }

                if (incomplete_radio.checked)
                {
                    filter_incomplete();
                }


            let close = Array.from(document.querySelectorAll('.close'))
            close.forEach(element => element.addEventListener("click", function()
            {

                    console.log(this.parentElement.id);
                    let id_to_remove = this.parentElement.id;
                    this.parentElement.remove();

                    delete_task(id_to_remove);
          
            }));
        }

        function addToLocalStorage(task_array) 
        {
            // conver the array to string then store it.
            localStorage.setItem('task_array', JSON.stringify(task_array));
            // render them to screen
            rendertask_array(task_array);
        }


        function getFromLocalStorage() 
        {
            const reference = localStorage.getItem('task_array');
            // if reference exists
            if (reference) 
            {
                // converts back to array and store it in todos array
                task_array = JSON.parse(reference);
                rendertask_array(task_array);
            }
        }



// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
        list.addEventListener('click', function(ev) 
        {
            

            //console.log(ev.target.id);
            let task_id = ev.target.id;
            let found_task;
            for (let i = 0; i < task_array.length; i++) 
            {
                if (task_id == task_array[i].id)
                {
                    found_task = task_array[i];
                    found_task.complete = !found_task.complete;
                    console.log(task_array[i]);
                    addToLocalStorage(task_array);
                }
            }
            
        }, false);
    

        function filter_complete()
        {
            let complete = task_array.filter(task => task.complete == true)
            render_tasks(complete);
        }

        function filter_incomplete()
        {
            let incomplete = task_array.filter(task => task.complete == false)
            render_tasks(incomplete);
        }


    
/*let cityID = 5604473;
let appid = 'e116f1daaa18ec188a8f9cad320d03eb';
const apiURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=41.3072&lon=-111.9602&units=imperial&appid=${appid}`;
fetch(apiURL2)
.then((response2) => response2.json())
.then((jsObject2) => {
//console.log(jsObject2);

console.log(jsObject2.current.temp.toFixed(0));
console.log(jsObject2.current.feels_like.toFixed(0));
console.log(jsObject2.current.weather[0].description);
console.log(jsObject2.current.humidity);

document.getElementById('current_temp').textContent = jsObject2.current.temp.toFixed(0);
document.getElementById('feels_like').textContent = jsObject2.current.feels_like.toFixed(0);
document.getElementById('description').textContent = jsObject2.current.weather[0].description;
document.getElementById('humidity').textContent = jsObject2.current.humidity;
});*/