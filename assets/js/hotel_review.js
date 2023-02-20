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
        let hotel_container = document.getElementById('hotel-reviews');
        hotel_container.innerHTML="";
        document.getElementById('hotel-name').innerHTML = hotel_name;


        //console.log(search_data);
        let response = await fetch('https://apidojo-booking-v1.p.rapidapi.com/reviews/list?hotel_ids='+hotel_id+'&user_sort=sort_most_relevant&offset=0', options);
        let res_data = await response.json();

        if (res_data.length == 0) {
            let onehotel = document.createElement('div');
            onehotel.innerHTML = `<h1 class="d-flex justify-content-center">Reviews not found</h1>`;
            hotel_container.appendChild(onehotel);
            return;
        }

        if (!response.ok) throw new Error(res_data.message);

        console.log(res_data);
        console.log(response);


        for(i=0;i<res_data.result.length;i++)
        {
            let result = res_data.result[i];
            let author = result.author.name;
            let avatar = result.author.avatar;
            let date = result.date;
            let room_name = result.stayed_room_info.room_name;
            let checkout = result.stayed_room_info.checkout;
            let checkin = result.stayed_room_info.checkin;
            let pros = result.pros;
            let cons = result.cons;
            let title = result.title;

            if(!avatar) avatar = "assets/img/no_image.png";
            

            let one_review = document.createElement('div');
            one_review.classList.add('outterround');
            one_review.innerHTML = `
                
                    <div class="d-flex align-items-center mb-3">
                        <img src="${avatar}" alt="" class="float-start" width="75" height="75">
                        <h3 style="margin-left: 20px;">${author}</h3>
                        <div class="d-flex justify-content-end" style="width: 100%;">
                            ${date}
                        </div>
                    </div>
                    <div>
                        <h4 class="ms-3 me-3"><em>"${title}"</em></h4>
                    </div>
                    <div class="mt-5 mb-3">
                        <span style="font-weight: 700;">Pros: </span>${pros}<br>
                        <span style="font-weight: 700;">Cons: </span>${cons}
                    </div>

                    <div style="font-size: 15px; color: grey;">
                        Check In Date: ${checkin} <br>
                        Check Out Date: ${checkout} <br>
                        Room: ${room_name}
                    </div>
                `;

            hotel_container.appendChild(one_review);
        }

        

        //localStorage.removeItem('hotel_id');
        //localStorage.removeItem('hotel_name');
        
    }
    catch (err) {
        console.error(err);
        //alert(err);
    }
}
