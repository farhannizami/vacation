'use strict';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fe99ee6122mshd19d79aa78d40fbp1325d6jsn7a8ba614013b',
		'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
	}
};

let i;

async function fetchData() {

    try {
        
        let hotel_id = localStorage.getItem('hotel_id');
        let hotel_name = localStorage.getItem('hotel_name');
        let hotel_container = document.getElementById('hotel-facilities');
        hotel_container.innerHTML = "";
        document.getElementById('hotel-name').innerHTML = hotel_name;


        //console.log(search_data);
        let response = await fetch('https://apidojo-booking-v1.p.rapidapi.com/properties/get-description?hotel_ids='+hotel_id, options);
        let res_data = await response.json();

        if (res_data.length == 0) {
            let onehotel = document.createElement('div');
            onehotel.innerHTML = `<h1 class="d-flex justify-content-center">Description not found</h1>`;
            hotel_container.appendChild(onehotel);
            return;
        }

        if (!response.ok) throw new Error(res_data.message);

        console.log(res_data);
        console.log(response);


        for(i=0;i<res_data.length;i++)
        {
            let descrip = document.createElement('div');
            descrip.innerHTML  = `
                <p>
                    ${res_data[i].description}
                </p>`;

            hotel_container.appendChild(descrip);
        }

        //localStorage.removeItem('hotel_id');
        //localStorage.removeItem('hotel_name')

        
    }
    catch (err) {
        console.error(err);
        //alert(err);
    }
}
