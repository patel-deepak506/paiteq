 function counter(initialValue = 0) {
    let counterValue = initialValue;
  
    function getCounterValue() {
      return counterValue;
    }
  
    function incrementCounter() {
      counterValue++;
    }
  
    return [getCounterValue, incrementCounter];
  }
  
  const [getA, nextA] = counter(1);
  console.log(getA()); // 1
  nextA();
  console.log(getA()); // 2
  
  