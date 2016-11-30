# Shanghai Metro Telegram Bot

A telegram bot to search for Shanghai Metro infos, timetables and stations.

----

# Plan One - Web

* poor html + js + css
* use nginx proxy pass for path and price API
* use local json for time and change path

### nginx server config

```
    ##所有/server/开头的请求都会走这里
    location /server/ {
        proxy_pass  http://service.shmetro.com/;
        proxy_set_header    Host    service.shmetro.com;
    }
```

# Plan Two - Nodejs

* https://github.com/yagop/node-telegram-bot-api
* npm install node-telegram-bot-api
* npm app

### 用法

```
/echo <anyword>
/smt 静安寺
/smt 虹桥火车站
```
