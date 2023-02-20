'use strict';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'fe99ee6122mshd19d79aa78d40fbp1325d6jsn7a8ba614013b',
        'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
};

let i;


function autoSearch()
{
    let search_data = document.getElementById('hotel-search').value;
    console.log(search_data+"s");
    if(search_data)
    {
        console.log('gese');
        fetchData();
    }
}


async function fetchData() {

    try {
        let search_data = document.getElementById('hotel-search').value;
        let list = document.getElementById('hotel-list');

        console.log(search_data);
        let response = await fetch('https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=' + search_data, options);
        let res_data = await response.json();
        //let res_data = response;

        if (res_data.length == 0) {
            let onehotel = document.createElement('div');
            onehotel.innerHTML = `<h1 class="d-flex justify-content-center">Hotel not found</h1>`;
            list.appendChild(onehotel);
            return;
        }

        if (!response.ok) throw new Error(res_data.message);

        console.log(res_data);

       
        list.innerHTML = "";

        //res_data = hotel_data.result;



        for (i = 0; i < res_data.length; i++) {

            //console.log(typeof (res_data));
            let onehotel = document.createElement('div');


            let image_url = res_data[i].image_url;

            if (!image_url) {
                image_url = "assets/img/no_image.png";
            }

            onehotel.innerHTML = `
                    <div class="row mb-3">
                            <div class="col-md-4 col-lg-3 d-flex justify-content-center">
                                <img src="${image_url}" height="150" width="150">
                            </div>
                            <div class="col-md-8 col-lg-9" id ='${res_data[i].dest_type}'>
                                <h2 class="area-title link-cursor" id="${res_data[i].dest_id}">${res_data[i].label}</h2>
                                Country: ${res_data[i].country} <br>
                                <span>Type: ${res_data[i].dest_type}</span> <br>
                                No of hotels: ${res_data[i].hotels}
                            </div>
                    </div>
                `;

            console.log(onehotel);
            list.appendChild(onehotel);
        }
        welcomeToHell();

    }
    catch (err) {
        console.error(err);
    }
}



function welcomeToHell() {

    let area_titles = document.querySelectorAll('.area-title');
    console.log(area_titles);
    for(i=0;i<area_titles.length;i++)
    {
        area_titles[i].addEventListener('click', function(e)
        {
            //console.log(e.target.parentNode.id);

            let dest_type = e.target.parentNode.id;
            console.log(dest_type);
            localStorage.setItem('dest_id',e.target.id);
            localStorage.setItem('dest_type',dest_type);
            location.href = 'hotel_description.html';
        });
    }
}

