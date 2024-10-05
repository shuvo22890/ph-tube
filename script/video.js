// Load videos from server
const loadVideos = (url, isCat)=>{
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayVideos(isCat ? data.category : data.videos))
    .catch(err=> console.log(err.message))
}

// Display videos in HTML page
const displayVideos = videos => {
    const videoContainer = document.getElementById('videos');
    let videosStr = "";
    videos.forEach(video=>{
        const isVerified = video.authors[0].verified;
        const time = video.others.posted_date;

        videosStr += `
            <div class="mb-5 sm:mb-0 v-${video.category_id}">
                <div class="relative">
                    <img class="object-cover w-full h-48 rounded-md" src="${video.thumbnail}">

                    ${time && '<div class="absolute bottom-3 right-3 bg-slate-800 rounded-lg text-white px-3 py-1"><p>'+formatTime(time)+'</p></div>'}
                </div>

                <div class="flex gap-3 pt-5 mb-3">
                    <div>
                        <img class="w-10 h-10 object-cover rounded-full" src="${video.authors[0].profile_picture}">
                    </div>

                    <div>
                        <h4 class="font-bold text-base text-[#171717]">
                        ${video.title}
                        </h4>
                        <p class="flex items-center gap-2 my-1 text-sm text-[#171717B3]">
                        ${video.authors[0].profile_name} 
                        ${isVerified ? '<span><img src="./assets/tik.png"></span>' : ""}
                        </p>
                        <p class="text-sm text-[#171717B3]">${video.others.views} views</p>
                    </div>
                </div>
                
                <button id="${video.video_id}" class="btn w-full text-base bg-red-500">Details</button>
            </div>`
    });
    if(videosStr==="")videosStr = `<div class='text-center text-3xl col-span-full pt-5 sm:pt-20 max-w-md px-5 mx-auto'>
        <img src="./assets/icon.png" class="mx-auto mb-5" >
        <h4>Oops!! Sorry, There is no content here</h4>
    </div>`;
    videoContainer.innerHTML = videosStr;
}

// Load videos according to search query
document.getElementById("searchQuery").addEventListener('keyup', e=>{
    const query = e.target.value;
    loadVideos("https://openapi.programming-hero.com/api/phero-tube/videos?title="+query);
});

// Sorting videos accroding to views
const initSort = ()=>{
    let switchOrder = true;
    document.getElementById("sortVideos").addEventListener('click', ()=>{
        switchOrder = !switchOrder;
        fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res=>res.json())
        .then(data=>{
            const sortedData = data.videos.sort((a, b)=>{
                const viewsOfA = parseFloat(a.others.views);
                const viewsOfB = parseFloat(b.others.views);
                if(switchOrder)return viewsOfB - viewsOfA;
                return viewsOfA - viewsOfB;
            });
            displayVideos(sortedData);
        })
        .catch(err=> console.log(err))
    })
}

initSort();

loadVideos('https://openapi.programming-hero.com/api/phero-tube/videos');

const formatTime = timeStr => {
    const timeInt = parseInt(timeStr);
    if(isNaN(timeInt))return;

    if(timeInt<3600){
        if(timeInt>60){
            const min = Math.trunc(timeInt / 60);
            const sec = timeInt % 60;
            return `${min} min ${sec} sec ago`;
        }

        return `${timeInt} sec ago`;
    }

    if(timeInt<86400){
        const hrs = parseInt(timeInt / 3600);
        const leftoverSec = timeInt % 3600;
        const min = parseInt(leftoverSec/60);
        return `${hrs} hrs ${min} min ago`;
    }

    const days = parseInt(timeInt / (86400*365));
    return `${days} years ago`;
}