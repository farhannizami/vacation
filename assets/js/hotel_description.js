'use strict';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'fe99ee6122mshd19d79aa78d40fbp1325d6jsn7a8ba614013b',
        'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
};

let i;


function autoSearch() {
    let arrive_date = document.getElementById('arrive-date').value;
    let depart_date = document.getElementById('depart-date').value;
    let guest_no = document.getElementById('guest-no').value;
    let room_no = document.getElementById('room-no').value;


    if(arrive_date!=='' && depart_date!=='' && guest_no!=='' && room_no!=='')
    {
        fetchData();
    }
}

async function fetchData() {

    try {
        let arrive_date = document.getElementById('arrive-date').value;
        let depart_date = document.getElementById('depart-date').value;
        let guest_no = document.getElementById('guest-no').value;
        let room_no = document.getElementById('room-no').value;
        let dest_id = localStorage.getItem('dest_id');
        let search_type = localStorage.getItem('dest_type');
        let hotel_container = document.getElementById('hotel-list');
        hotel_container.innerHTML = "";

        console.log(arrive_date);
        console.log(depart_date);
        console.log(dest_id);
        console.log(search_type);


        //console.log(search_data);
        let response = await fetch('https://apidojo-booking-v1.p.rapidapi.com/properties/list?offset=0&arrival_date=' + arrive_date + '&departure_date=' + depart_date + '&guest_qty=' + guest_no + '&dest_ids=' + dest_id + '&room_qty=' + room_no + '&search_type=' + search_type + '&search_id=none&order_by=popularity', options);
        let res_data = await response.json();

        if (res_data.length == 0) {
            let onehotel = document.createElement('div');
            onehotel.innerHTML = `<h1 class="d-flex justify-content-center">Hotel not found</h1>`;
            list.appendChild(onehotel);
            return;
        }

        if (!response.ok) throw new Error(res_data.message);

        console.log(res_data);
        //let hotel_name;


        for (i = 0; i < res_data.result.length; i++) {
            let resval = res_data.result[i];
            let hotel_id = resval.hotel_id;
            let address = resval.address;
            let hotel_name = resval.hotel_name;
            let min_total_price = resval.min_total_price;
            let currency = resval.currencycode;
            let photo_link = resval.main_photo_url;
            let checkin = resval.checkin;
            let checkout = resval.checkout;

            let hotel_details = document.createElement('div');
            hotel_details.classList.add('outterround');

            hotel_details.innerHTML = `
                <div class="mb-3">
                    <div class="d-flex justify-content-center">
                        <img src="${photo_link}" alt="" width="250" height="250">
                    </div>

                    <h1 class="mt-3 hotel-name link-cursor" id = "${hotel_id}" >
                        ${hotel_name}
                    </h1>
                    <p>
                        Address: ${address} <br>
                        Price: ${min_total_price} ${currency} <br>
                        Check In : ${checkin.from} to ${checkin.until} <br>
                        Check Out : ${checkout.from} to ${checkout.until} <br>
                    </p>
                    <p id="${hotel_id}" class="view-reviews link-cursor" style="color: green;">
                        View Reviews
                    </p>                  
                    
                </div>
            `;

            hotel_container.appendChild(hotel_details);
        }

        document.getElementById('hotel-search').disabled = true;

        //localStorage.removeItem('dest_type');
        //localStorage.removeItem('dest_id');

        addMasala();
        addreviewMasala();
    }
    catch (err) {
        console.error(err);
        //alert(err);
    }
}



function addMasala() {
    let allnames = document.querySelectorAll('.hotel-name');

    for (i = 0; i < allnames.length; i++) {
        allnames[i].addEventListener('click', function (e) {
            let hotel_id = e.target.id;
            //alert(e.target);
            localStorage.setItem('hotel_id', hotel_id);
            localStorage.setItem('hotel_name', e.target.innerHTML);
            location.href = 'hotel_facilities.html';
        });
    }
}


function addreviewMasala() {
    let allreview = document.querySelectorAll('.view-reviews');

    for (i = 0; i < allreview.length; i++) {
        allreview[i].addEventListener('click', function (e) {
            let hotel_id = e.target.id;
            //alert(e.target);

            let parent = e.target.parentNode.parentNode;
            let hotel_name = parent.children[0].children[1].innerHTML;
            console.log(hotel_name);

            localStorage.setItem('hotel_id', hotel_id);
            localStorage.setItem('hotel_name',hotel_name);
            location.href = 'hotel_review.html';
        });
    }
}