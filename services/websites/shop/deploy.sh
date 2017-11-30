npm run build

which serve
if [ $? -eq 1 ]; then
   npm i -g serve
fi
./node_modules/serve/bin/serve.js -s build --port ${PORT-3339}
