const addFD = document.querySelector('.add_fd')
const requirementTemplet = document.querySelector('.fd_input')
const calculateButton = document.querySelector('.calculateButton')
let FDlist = document.querySelectorAll('.fd_input')

class batterSet extends Set {
    isSubSet(setB) {
        return [...this].every(value => setB.has(value));
    }

    union(setB) {
        return new Set([...this, ...setB]);
    }

    isEqual(setB) {
        return [...this].every(value => setB.has(value)) && [...setB].every(value => this.has(value));
    }
}

addFD.addEventListener('click', () => {
    // requirementTemplet.parentNode.appendChild(requirementTemplet.cloneNode(true))
    addFD.parentNode.parentNode.insertBefore(requirementTemplet.cloneNode(true), addFD.parentNode)
})

const getFDelement = function (fdNode) {
    const leftHand = new batterSet(fdNode.childNodes[1].value);
    const righrHand = new batterSet(fdNode.childNodes[3].value);
    const res = [leftHand, righrHand];
    return res
}

const setSuperKeyOrNot = function (targetset, fds, R) {
    let lastRound = targetset;
    let thisRound = targetset;
    fds.forEach((fd) => {
        if (fd[0].isSubSet(thisRound)) {
            thisRound = thisRound.union(fd[1]);
        }
    })

    while (!lastRound.isEqual(thisRound)) {
        lastRound = thisRound;
        fds.forEach((fd) => {
            if (fd[0].isSubSet(thisRound)) {
                thisRound = thisRound.union(fd[1]);
            }
        });
    }

    return thisRound.isEqual(R);
}

// const findCandidate = function (targetset, fds, R) {
//     const isSuperKey = 
// }

calculateButton.addEventListener('click', () => {
    FDlist = document.querySelectorAll('.fd_input');
    const allFDinSet = [];
    FDlist.forEach((FDNode) => allFDinSet.push(getFDelement(FDNode)));
    let superKey = new batterSet(allFDinSet.map((item) => [...item[0]]).flat());
    let R = new batterSet(allFDinSet.map((item) => [...item[1]]).flat()).union(superKey);

    console.log(`${Array.from(superKey)} is super key and ${Array.from(R)} is R`);

    console.log(setSuperKeyOrNot(superKey, allFDinSet, R));
})