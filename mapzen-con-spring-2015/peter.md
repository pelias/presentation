
<style>
  .reveal section img {
    border-style: none;
  }
</style>

# Search

![search](http://creativeoverflow.net/wp-content/uploads/2012/10/26-31-sexy-search-boxes.png)

---

![old school](http://www.toplessrobot.com/2-searching.jpg)

---

![90s](http://www.everfunny.com/wp-content/uploads/2013/02/1990s-problem.jpg)

---

![databases](https://www.drupal.org/files/images/tsort_table_example.png)

---

![ui](http://cdn.mashable.com/wp-content/uploads/2010/08/BrowserElements.jpg)

---

![ui2](http://blog.canto.com/wp-content/uploads/2015/02/query1neu.jpg)

---

![query](http://rlv.zcache.com/sql_pub_time_t_shirts-re820e7150b85428780800345868f8e43_804gs_1024.jpg)

---

![query2](http://www.first8.nl/wp-content/uploads/2014/05/Screen-Shot-2014-05-13-at-16.29.png)

---

![human](http://static.fjcdn.com/pictures/Google+hacks+here+s+a+cheat+sheet+to+help+you+google_c857be_4992885.jpg)

---

![predictive](http://cdn.smosh.com/sites/default/files/bloguploads/google-search-suggestions-1.jpg)

---

![pizza](http://www.yext.com/blog/wp-content/uploads/2012/06/pizza-yelp.png)

---

## humanizing information retrieval

---

## design considerations

![design](https://navigatingdaedaluslabyrinth.files.wordpress.com/2013/02/01_misaligned_bridge_503.jpg)

---

### differentiation

- It's completely open-source and MIT licensed
- It's based on open-data, so you can run it yourself
- You can install it locally and modify to suit your needs
- It has an impressive list of features, such as **fast autocomplete**
- It's modular, so you don't need to be an expert to make changes
- It's easy to install and requires no external dependencies
- We run a continuous deployment cycle with a new version shipping weekly

---

### goals

- Provide accurate search results
- Give users query suggestions (typeahead in the search box)
- Account for location bias (places nearer to you appear higher in the results)
- Support multiple data sources (OSM, geonames, quattroshapes etc)
- Flexible software architecture
- Easy to contribute software patches and features to
- Easy to set-up and configure your own instance
- No external dependencies (such as postgres)
- Reliable, configurable & fast import process
- Work equally well for a small city and the entire planet

---

## tasks

- importing data
- intuitive query logic / API
- administrative polygons
- postal addresses
- normalization / de-duplication
- natural language
- developer relations / feedback

---

