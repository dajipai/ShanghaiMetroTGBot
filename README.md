# Shanghai Metro Telegram Bot

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
