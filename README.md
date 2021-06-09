# crash-ci

### Clone this repository
```shell
git clone https://github.com/nvgoldin/crash-ci.git
```


### Pull the images (will speed up things later)
```shell
cd crash-ci
docker-compose pull
```


### Execute our very simple unit tests
```shell
cd crash-ci/app
npm install
npm itest
```

Output should be similar to:
```shell

> app@1.0.0 test /home/nadav/src/github.com/nvgoldin/crash-ci/app
> mocha



  addTwoNumbers()
    ✔ should add two numbers


  1 passing (3ms)

```

### First task!
* Find addTwoNumbers function
* Renmame it to "addTwoNumbers<YourName>"
* Run the unit tests, see they failed and rerun them again until they pass (by fixing the name).
* Commit your code
  * `git commit -m 'Added <MyName> to this test'
  



## CI setup

### Setup Gogs

[Gogs](https://gogs.io/) is a simple git server - we are going to run it locally.

Spin it up via docker-compose:

```shell
cd crash-ci
docker-compose -d up
```

Now go to http://localhost:3000/ and setup Gogs:
* Use SQLite as the selected DB
* Under admin account setting :
    * pick adminadmin/adminadmin as username/password
    * email doesn't matter
* click "Install Gogs"

Next setup a new repository named "crash-ci" under the "+" sign in "My Repositories", click "save".

Now, lets push this repository to the new Git server - back to the terminal type:
```shell
git remote add local http://adminadmin:adminadmin@localhost:3000/adminadmin/crash-ci.git
```

Then push the code to our newly created remote:
```shell
git push local
```

Back to your browser refresh http://localhost:3000/adminadmin/crash-ci, you should see our repository in there, cool uh?

Now we got our Git server up and running, lets move to Jenkins!

### Jenkins

* Log into http://localhost:3001/ 
* Click "New item" -> select **Freestyle project** and name it "my-app-pipeline".
  * Under "Source Code management":
    * pick Git
    * Repository URL: `http://adminadmin:adminadmin@gogs:3000/adminadmin/crash-ci.git`
    * Wait a few seconds that it doesn't yield any errors, which means Jenkins is able to connect
  * Under "Build"->"Add build step" press "execute shell"
    * Inside "Execute shell" copy paste the following:
    ```shell
    cd app
    npm install
    npm test
    ```
    
 * Click "Save"
 * Press "Build Now"
 * After a few seconds, you should see a new build executing, access by pressing or going to http://localhost:3001/job/my-app-pipeline/1/console
 * If everything went fine you should see an output similar to:
 ```shell
 + cd app
+ npm install
added 99 packages, and audited 100 packages in 6s

19 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
+ npm test

> app@1.0.0 test
> mocha



  addTwoNumbers()
    ✔ should add two numbers


  1 passing (3ms)

Finished: SUCCESS
```
 




