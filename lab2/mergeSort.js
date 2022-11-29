function mergeSort(arr) {

    // Base case
    if (arr.length <= 2) return arr
    let mid = Math.floor(arr.length / 2)
    if(arr.length/2 % 2 == 1){
        mid = mid + 1
    }
    // Recursive calls
    let left = mergeSort(arr.slice(0, mid))
    let right = mergeSort(arr.slice(mid))

    return merge(left, right)
}

// https://stackoverflow.com/questions/16267466/merge-sort-on-an-array-of-floating-point-numbers-of-fixed-size-25-c-programming
function merge(left, right) {
	let arr = new Float32Array(left.length + right.length); // the sorted items will go here
	let i = 0,
		l = 0,
		r = 0;
	//The while loops check the conditions for merging
	while (l < left.length && r < right.length) {
		if (left[l] == right[r]) {
			if (left[l + 1] < right[r + 1]) {
				arr[i] = left[l];
				arr[i + 1] = left[l + 1];
				l += 2;
				i += 2;
			} else {
				arr[i] = right[r];
				arr[i + 1] = right[r + 1];
				r += 2;
				i += 2;
			}
		}
		if (left[l] < right[r]) {
			arr[i] = left[l];
			arr[i + 1] = left[l + 1];
			l += 2;
			i += 2;
		} else {
			arr[i] = right[r];
			arr[i + 1] = right[r + 1];
			r += 2;
			i += 2;
		}
	}
	while (l < left.length) {
		arr[i] = left[l];
		arr[i + 1] = left[l + 1];
		l += 2;
		i += 2;
	}
	while (r < right.length) {
		arr[i] = right[r];
		arr[i + 1] = right[r + 1];
		r += 2;
		i += 2;
	}
	// Use spread operators to create a new array, combining the three arrays
	return arr;
}


//arr2= [7.002, 4.1, 7.66, 2, 5, 7, 5, 10, 1, 2, 0.5, 15]
//arr = [[6, 7], [2, 9], [10, 1], [2, 3], [4, 5], [99, 32], [5, 2]];
//console.log(mergeSort(arr2));
//console.log(PairToList(mergeSort(arr)));
//console.log(ListToPair(arr2));
