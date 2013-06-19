
var feeds_div
var profile_div

var blogpost_template


var options
var url


var post_ids
var posts = []

var profile_data;

function init(){
    
    options = args_to_object(document.location.search);

    feeds_div = document.getElementById('feeds');
    profile_div = document.getElementById('profile');

    post_ids = 0;
    blogpost_template = document.getElementById('blogpost_template');
    aggregate(options.base_url+'/microblog/microposts_list');
    set_profile();

//    init_remotestorage();
}


function new_post(data){
    posts.push(new Post(data));
}

function get_items (items) {
    items.sort(function(a,b){
	if(a.created_at < b.created_at)
	    return -1;
	if(a.created_at > b.created_at)
	    return 1;
	return 0;
    }) // TODO lets see if this works with timestamps in the used format (whatever that might be)
    items.forEach(aggregate_item);
}

function aggregate(url){
    get_url(url, get_items);
}

function aggregate_item(url){
    get_url(url, new_post);
}


window.onload = init;
