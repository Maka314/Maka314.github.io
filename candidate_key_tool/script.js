const addFD = document.querySelector(".add_fd");
const requirementTemplet = document.querySelector(".fd_input");
const calculateButton = document.querySelector(".calculateButton");
let FDlist = document.querySelectorAll(".fd_input");
const resSample = document.querySelector(".result_box");
const resContainer = document.querySelector(".result"); 

class batterSet extends Set {
  isSubSet(setB) {
    return [...this].every((value) => setB.has(value));
  }

  union(setB) {
    return new batterSet([...this, ...setB]);
  }

  isEqual(setB) {
    return (
      [...this].every((value) => setB.has(value)) &&
      [...setB].every((value) => this.has(value))
    );
  }
}

addFD.addEventListener("click", () => {
  addFD.parentNode.parentNode.insertBefore(
    requirementTemplet.cloneNode(true),
    addFD.parentNode
  );
});

const getFDelement = function (fdNode) {
  const leftHand = new batterSet(fdNode.childNodes[1].value);
  const righrHand = new batterSet(fdNode.childNodes[3].value);
  const res = [leftHand, righrHand];
  return res;
};

const setSuperKeyOrNot = function (targetSet, fds, R) {
  let lastRound = new batterSet(targetSet);
  let thisRound = new batterSet(targetSet);
  fds.forEach((fd) => {
    if (fd[0].isSubSet(thisRound)) {
      thisRound = thisRound.union(fd[1]);
    }
  });

  while (!lastRound.isEqual(thisRound)) {
    lastRound = new batterSet(thisRound);
    fds.forEach((fd) => {
      if (fd[0].isSubSet(thisRound)) {
        thisRound = thisRound.union(fd[1]);
      }
    });
  }

  return thisRound.isEqual(R);
};

const findCandidate = function (targetSet, fds, R) {
  // const isSuperKey = setSuperKeyOrNot(targetSet, fds, R);
  let candaditeKeys = [];
  const subSuperKeys = [];

  [...targetSet].forEach((item) => {
    const tempSet = new batterSet(targetSet);
    tempSet.delete(item);
    const isTempSuperKey = setSuperKeyOrNot(tempSet, fds, R);
    if (isTempSuperKey) subSuperKeys.push(tempSet);
  });

  if (!subSuperKeys.length) {
    candaditeKeys.push(targetSet);
  } else {
    subSuperKeys.forEach((item) => {
      candaditeKeys = candaditeKeys.concat(findCandidate(item, fds, R));
    });
  }

  return candaditeKeys;
};

calculateButton.addEventListener("click", () => {
  const allRes = document.querySelectorAll(".result_box");
  allRes.forEach((item) => {
    if (!item.classList.contains('hidden')) item.remove();
  })
  FDlist = document.querySelectorAll(".fd_input");
  const allFDinSet = [];
  FDlist.forEach((FDNode) => allFDinSet.push(getFDelement(FDNode)));
  let superKey = new batterSet(allFDinSet.map((item) => [...item[0]]).flat());
  let R = new batterSet(allFDinSet.map((item) => [...item[1]]).flat()).union(
    superKey
  );

  const candaditeKeys = findCandidate(superKey, allFDinSet, R);
  const uniqueCandaditeKeys = [];
  candaditeKeys.forEach((item) => {
    let inSide = false;
    uniqueCandaditeKeys.forEach((item2) => {
      if (item.isEqual(item2)) inSide = true;
    })
    if (!inSide) uniqueCandaditeKeys.push(item);
  });
  console.log(uniqueCandaditeKeys);
  resContainer.classList.remove('hidden');
  uniqueCandaditeKeys.forEach((cKey) => {
    const temp = resSample.cloneNode(true);
    temp.textContent = Array.from(cKey).join(', ');
    temp.classList.remove('hidden');
    resContainer.insertBefore(temp, resSample);
  })
});
