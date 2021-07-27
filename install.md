## 实验准备

### 相关资源

- ECS服务器一台，或者本地电脑一台（最好是Mac操作系统或者是Linux操作系统）

### 服务相关

- 开通函数计算服务：https://fc.console.aliyun.com/
### 基础知识

- 函数计算（FunctionCompute）

    函数计算是事件驱动的全托管计算服务。使用函数计算，您无需采购与管理服务器等基础设施，只需编写并上传代码。函数计算为您准备好计算资源，弹性地可靠地运行任务，并提供日志查询、性能监控和报警等功能。函数计算帮助您无需管理服务器（Serverless），仅专注于函数代码就能快速搭建应用。函数计算能够弹性地伸缩，您只需要按使用量付费。

    函数计算Serverless服务和自建服务相比有以下优点：
    - 上手简单， 只专注业务逻辑开发， 极大提高工程开发效率。
    - 自建方案有太多学习和配置成本，例如针对不同场景，ESS需要做各种不同的参数配置系统环境的维护升级麻烦等。
    - 免运维，函数执行级别粒度的监控和告警。
    - 毫秒级弹性扩容，保证弹性高可用，同时能覆盖延迟敏感和成本敏感类型。

- Serverless Devs开发者工具

    Serverless Devs 是一个组件化与插件化的 Serverless 开发者平台，开发者可以在平台中可插拔式的使用不同 Serverless 的服务和框架，同时可参与组件和插件的开发。无论是工业级的 Serverless 服务，还是各类开源的 Serverless 框架，Serverless Devs 都可友好支持。开发者无需对市面上每一款 Serverless 工具进行研究和学习，只需通过 Serverless Devs ，就可以简单、快捷的“上手”主流 Serverless 服务和框架。
    

## 实验1：函数计算入门

### 开通函数计算服务

在使用函数计算前，您需要开通函数计算服务。

> 说明：本场景中提供的阿里云子账号无函数计算服务操作权限，所以请使用您自己的阿里云账号操作。您无需担心扣费问题，因为函数计算服务有一定的免费额度，请参见[计费方式](https://help.aliyun.com/document_detail/54301.html?spm=a2c6h.13858378.0.0.6c362834qbQQbZ) 。

1.  使用您自己的阿里云账号登录阿里云控制台，然后进入[函数计算产品详情页](https://www.aliyun.com/product/fc?spm=a2c6h.13858378.0.0.6c362834qbQQbZ) 。

2.  单击【免费开通】。

    ![](https://img.alicdn.com/tfs/TB1MiA0bLzO3e4jSZFxXXaP_FXa-1840-699.png)

3.  阅读《函数计算服务协议》勾选同意服务协议，最后单击【立即开通】。

    ![](https://img.alicdn.com/tfs/TB1HaB9ajMZ7e4jSZFOXXX7epXa-1817-348.png)

4.  单击【管理控制台】进入函数计算控制台。
    
    ![](https://img.alicdn.com/tfs/TB1azc5acVl614jSZKPXXaGjpXa-1218-361.png)
    
### 开发函数计算HelloWorld应用

1.  在函数计算控制台首页，单击【新建函数】。

![](https://img.alicdn.com/tfs/TB105h6ajMZ7e4jSZFOXXX7epXa-2866-1600.png)

2.  选择【HTTP函数】，然后单击【下一步】。

![](https://img.alicdn.com/tfs/TB1T1qfMoH1gK0jSZSyXXXtlpXa-2424-658.png)

3.  参考以下说明填写函数和触发器配置，然后单击【完成】。

```
所在服务：例如hello_world_service。
绑定日志：填写所在服务名称后默认勾选绑定日志，日志服务会收取少量费用，您可以选择取消勾选。
函数名称：例如hello_world。
运行环境：选择nodejs10。
触发器名称：例如hello_world_trigger。
认证方式：选择anonymous。
请求方式：选择GET。
``` 

![](https://img.alicdn.com/tfs/TB14w9jMkT2gK0jSZFkXXcIQFXa-1494-901.png)

4.  在 代码执行管理 页面，将index.js文件中的内容替换为如下所示：

```javascript
var getRawBody = require('raw-body')
module.exports.handler = function (request, response, context) {
    getRawBody(request, function (err, data) {
        var respBody = new Buffer.from("你好，世界！");
        response.setStatusCode(200)
        response.setHeader('content-type', 'text/html')
        response.send(respBody)
    })
};
```

替换后如下所示：

![](https://img.alicdn.com/tfs/TB1gloCcQ9l0K4jSZFKXXXFjpXa-1665-808.png)

5.  单击编辑器右上角【Save Invoke】保存并运行示例代码。

![](https://img.alicdn.com/tfs/TB1nj89MXY7gK0jSZKzXXaikpXa-1660-775.png)

可以看到函数运行成功，并返回： 你好，世界！
### 安装Serverless Devs开发者工具
#### 创建实验资源
##### 创建资源   

在页面左侧，单击 云产品资源 下拉列表，查看本次实验所需资源。   
单击屏幕右侧 创建资源 ，免费创建当前实验所需云产品资源。

> 说明：
> 资源创建过程需要1~3分钟。完成实验资源的创建后，您可以在 云产品资源 列表查看已创建的资源信息，例如：IP地址、子用户名称和子用户密码等。

![](https://img.alicdn.com/imgextra/i2/O1CN01kT7wbQ1cNLllXORQU_!!6000000003588-2-tps-1920-914.png)

##### 连接ECS服务器

1. 资源创建完毕后，双击 LX终端图标 即可打开shell终端窗口。

![](https://img.alicdn.com/imgextra/i1/O1CN01oMAk701pyWvSM8fQe_!!6000000005429-2-tps-1920-914.png)

2. 在终端中输入连接命令ssh [username]@[ipaddress]后按键盘enter键。您需要将username和ipaddress替换成ECS服务器的登录名和公网地址，ECS服务器的登录名和公网地址可在第一小节中的 云产品资源 下拉列表中查看。例如：

```
ssh root@139.xxx.xxx.230
```

3. 输入yes，该操作表示同意继续连接。执行该操作后，您将会收到输入登录密码的提示。

4. 输入登录密码。密码为已创建的ECS服务器的登录密码。注意输入密码时不会有任何显示。

5. 成功连接后如下图所示：

![](https://img.alicdn.com/imgextra/i2/O1CN01j6U4t11orpW2KecIM_!!6000000005279-2-tps-1920-914.png)

6. 体验过程中可以收起子用户信息来更完整查看实验手册。

![](https://img.alicdn.com/imgextra/i3/O1CN01CcuTIT1ukOmjSQBuY_!!6000000006075-2-tps-568-907.png)

##### 安装Serverless Devs命令行工具

1.  按照以下操作安装Node.js环境。

    a.  下载Node.js安装包。
    
    ```
    wget https://npm.taobao.org/mirrors/node/v12.4.0/node-v12.4.0-linux-x64.tar.xz
    ```

    b.  解压安装包并重命名。
    
    ```
    tar -xvf node-v12.4.0-linux-x64.tar.xz && mv node-v12.4.0-linux-x64/ /usr/local/node
    ```

    c.  配置环境变量。
    
    ```
    echo "export PATH=$PATH:/usr/local/node/bin" >> /etc/profile
    source /etc/profile
    ```

2.  在命令行终端中执行以下命令安装Serverless-Devs工具。

```
npm install @serverless-devs/s -g
```

命令执行结果类似如下。

![](https://img.alicdn.com/tfs/TB1gXYwTHr1gK0jSZFDXXb9yVXa-1097-155.png)

说明:  如果安装过程较慢，可以使用淘宝npm源，安装命令为`npm --registry=https://registry.npm.taobao.org install @serverless-devs/s -g`。

3.  执行查看版本命令以检查安装。

```
s -v
```

命令执行结果类似如下。

```
💻  local  version : 2.0.65
☁️  remote version : 2.0.65
```

##### 配置阿里云账号信息

> 说明：
> 本场景提供免费的ECS服务器，但是使用的函数计算服务是开通在您账号下，以下配置信息也是需要配置您账号的UID、AKID和AKSecret信息。

执行以下账号信息配置命令。

```
s config add
```

然后根据提示填写以下信息。

- 云厂商：选择阿里云（alibaba）。
- AccountID：登录 函数计算控制台 即可查看您的阿里云主账号ID。
    ![](https://img.alicdn.com/tfs/TB1GJYvTUY1gK0jSZFCXXcwqXXa-2864-1268.png)
- AccessKeyID和AccessKeySecret：在AccessKey管理页面单击 查看Secret 即可查看密钥信息。
    ![](https://img.alicdn.com/tfs/TB1Busafcieb18jSZFvXXaI3FXa-2868-1252.jpg)
    
    
# Step4. 部署童年回忆

## Step4.1 初始化项目

执行代码初始化项目：

```
s init fc-nes-game
```

执行完成，可以看到系统让我们输入项目名/文件夹名：

```
🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Please input your project name (init dir) 
```

此时我们可以输入`fc-nes-game`，完成之后，系统会让我们选择密钥：

```

🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Please input your project name (init dir) fc-nes-game
✔ File decompression completed
? please select credential alias (Use arrow keys)
❯ default 
  default-aliyun 
```

此时我们选择刚刚配置好的密钥信息即可：

```
🚀 Serverless Awesome: https://github.com/Serverless-Devs/package-awesome

? Please input your project name (init dir) fc-nes-game
✔ File decompression completed
? please select credential alias default
    
    ____________________     ________    _____      _____  ___________
    \_   _____/\_   ___ \   /  _____/   /  _  \    /     \ \_   _____/
     |    __)  /    \  \/  /   \  ___  /  /_\  \  /  \ /  \ |    __)_ 
     |     \   \     \____ \    \_\  \/    |    \/    Y    \|        \
     \___  /    \______  /  \______  /\____|__  /\____|__  /_______  /
         \/            \/          \/         \/         \/        \/ 
     

    Welcome to the fc-nes-game application
     This application requires to open these services: 
         FC : https://fc.console.aliyun.com/
     This application can help you quickly deploy the fc-nes-game project.
     The application uses FC component：https://github.com/devsapp/fc
     The application homepage: https://github.com/devsapp/fc-nes-game


🏄‍ Thanks for using Serverless-Devs
👉 You could [cd /Users/jiangyu/Desktop/fcdempo/todo/fc-nes-game] and enjoy your serverless journey!
🧭️ If you need help for this example, you can use [s -h] after you enter folder.
💞 Document ❤ Star：https://github.com/Serverless-Devs/Serverless-Devs

```

## Step4.2 进入项目

只需要执行:

```
cd cd fc-nes-game
```

即可进入项目，并且可以通过`ls`浏览文件夹：

```
bottle.py	index.py	s.yaml		src
```

## Step4.3 部署项目

只需要执行：

```
s deploy
```

即可进行项目部署：

```

Tips for next step
======================
* Display information of the deployed resource: s info
* Display metrics: s metrics
* Display logs: s logs
* Invoke remote function: s invoke
* Remove Service: s remove service
* Remove Function: s remove function
* Remove Trigger: s remove trigger
* Remove CustomDomain: s remove domain



myFCGame:
  region: cn-hangzhou
  service:
    name: my-fc-game-service
  function:
    name: my-fc-game-function
    runtime: python3
    handler: index.app
    memorySize: 128
    timeout: 60
  url:
    system_url: >-
      https://158320********************game-function/
    custom_domain:
      - domain: >-
          http://my-fc-game-fu********************hou.fc.devsapp.net
  triggers:
    - type: http
      name: httpTrigger
```

结束之后，我们只需要打开，返回给我们的`custom_domain`->`domain`地址，即可看到二维码，用手机扫一下二维码，开始"暑期不寂寞"之旅。