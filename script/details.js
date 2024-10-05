const loadVideoDetails = async(id)=>{
    const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/video/'+id);
    const data = await response.json();
    return data;
}

const selectWithId = id => document.getElementById(id);
selectWithId('videos').addEventListener('click', async(e)=>{
    const target = e.target;
    if(target.tagName!=='BUTTON')return;
    selectWithId('my_modal_1').showModal();
    const {video} = await loadVideoDetails(target.id);
    const {authors, description, thumbnail, title, others} = video;
    selectWithId('video-thumb').src = thumbnail;
    selectWithId('modal-title').innerText = title;
    selectWithId('author-thumb').src = authors[0].profile_picture;
    selectWithId('author-name').innerText = authors[0].profile_name;
    selectWithId('video-views').innerText = others.views;
    selectWithId('desc').innerText = description;
    if(authors[0].verified){
        const img = document.createElement('img');
        img.src = "./assets/tik.png";
        selectWithId('author-name-box').appendChild(img);
    }

    if(others.posted_date){
        const div = document.createElement('div');
        div.className = "absolute bottom-3 right-3 bg-slate-800 rounded-lg text-white px-3 py-1";
        div.innerHTML = '<p>'+formatTime(others.posted_date)+'</p>';
        selectWithId("thum-container").appendChild(div);
    }
});

