module.exports = {
  checkCode: function(code){
    code = code.toString();
    code = code.trim();
    length = code.length;
    checkMark = code.charAt(length-1);
    for(var i=length-2,c1=0;i>=0;i-=2){
      c1 += Number(code.charAt(i));
    }
    for(var i=length-3,c2=0;i>=0;i-=2){
      c2 += Number(code.charAt(i))
    }
    c3 = 10-(c1*3+c2)%10;
    if(c3==10){
      c3=0;
    }
    if(c3==checkMark){
      console.log("检验数正确");
      return -1;
    }else {
      console.log("检验数错误，正确检验数应为" + c3);
      return c3;
    }
  },
  getCheckCode: function(code){
    code = code.toString();
    code = code.trim();
    length = code.length;
    for(var i=length-1,c1=0;i>=0;i-=2){
      c1 += Number(code.charAt(i));
    }
    for(var i=length-2,c2=0;i>=0;i-=2){
      c2 += Number(code.charAt(i))
    }
    c3 = 10-(c1*3+c2)%10;
    if(c3==10){
      c3=0;
    }
    console.log("检验数:" + c3);
    return c3;
  }
}
