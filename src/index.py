# -*- coding: utf-8 -*-
import os
import bottle

def getFile(n):
    with open(os.path.join('src', n), 'rb') as f:
        resultData = f.read()
    return resultData

@bottle.route('/<n:re:.+>')
def game(n):
    if os.path.exists(os.path.join('src', n)) and os.path.isfile(os.path.join('src', n)):
        if 'index.html' in n:
            return getFile(n).decode("utf-8").replace('{{gameName}}', os.environ.get("game", 'fighter_f8000'))
        return getFile(n)
@bottle.route('/')
def game():
    return getFile('welcome.html')




if __name__ == '__main__':
    bottle.run(port=8015)
else:
    app = bottle.default_app()