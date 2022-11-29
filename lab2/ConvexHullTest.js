/*
 * Convex hull algorithm - Library (compiled from TypeScript)
 *
 * Copyright (c) 2021 Project Nayuki
 * https://www.nayuki.io/page/convex-hull-algorithm
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program (see COPYING.txt and COPYING.LESSER.txt).
 * If not, see <http://www.gnu.org/licenses/>.
 */


    // Returns a new array of points representing the convex hull of
    // the given set of points. The convex hull excludes collinear points.
    // This algorithm runs in O(n log n) time.
    function makeHull(points) {
        let newPoints = points.slice();
        return makeHullPresorted(newPoints);
    }

    //   convexhull.makeHull = makeHull;
    // Returns the convex hull, assuming that each points[i] <= points[i + 1]. Runs in O(n) time.

    function makeHullPresorted(points) {

        if (points.length <= 6)
            return points.slice();

        // Andrew's monotone chain algorithm. Positive y coordinates correspond to "up"
        // as per the mathematical convention, instead of "down" as per the computer
        // graphics convention. This doesn't affect the correctness of the result.

        let upperHull = [points[0], points[1], points[2], points[3]];
        let lowerHull = [points[0], points[1], points[i - 4], points[i - 3]];

        for (let i = 6; i < points.length; i = i +2) {


            upperHull.push(points[i]);
            upperHull.push(points[i+1]);

            while (upperHull.length > 4) {
            // last three point not making right turn

                let p3_x = upperHull[upperHull.length - 6];
                let p3_y = upperHull[upperHull.length - 5];
                let p2_x = upperHull[upperHull.length - 4];
                let p2_y = upperHull[upperHull.length - 3];
                let p1_x = upperHull[upperHull.length - 2];
                let p1_y = upperHull[upperHull.length - 1];

                if (isRight(p3_x, p3_y, p2_x, p2_y, p1_x, p1_y)) {
                    break;

                }else{
                    upperHull.splice(upperHull.length - 4, 2);
                }
            }

            lowerHull.push(points[i]);
            lowerHull.push(points[i+1]);

            while (lowerHull.length > 4) {
                let p3_x = lowerHull[lowerHull.length - 6];
                let p3_y = lowerHull[lowerHull.length - 5];
                let p2_x = lowerHull[lowerHull.length - 4];
                let p2_y = lowerHull[lowerHull.length - 3];
                let p1_x = lowerHull[lowerHull.length - 2];
                let p1_y = lowerHull[lowerHull.length - 1];

                if (isRight(p3_x, p3_y, p2_x, p2_y, p1_x, p1_y)) {
                    break;
                }else{
                    lowerHull.splice(lowerHull.length - 4, 2);
                }

            }

        }
        upperHull.pop();
        upperHull.pop();


        if (upperHull.length == 1 && lowerHull.length == 1 && upperHull[0].x == lowerHull[0].x && upperHull[0].y == lowerHull[0].y)
            return upperHull;
        else
            return upperHull.concat(lowerHull);
    }


    function isRight(p3_x, p3_y, p2_x, p2_y, p1_x, p1_y){
        if (((p2_x - p3_x)*(p1_y - p3_y) - (p2_y - p3_y)*(p1_x - p3_x)) >= 0)
            return false;
        else (((p2_x - p3_x)*(p1_y - p3_y) - (p2_y - p3_y)*(p1_x - p3_x)) < 0)
            return true;
    }




    arr = new Float32Array([293.67327880859375, 179.11085510253906, 294.9455261230469, 114.69638061523438, 337.3639221191406, 527.9010620117188, 367.4409484863281, 534.4290771484375, 420.5445556640625, 585.8534545898438, 466.6331787109375, 112.856201171875, 634.5469360351562, 579.3555908203125]);
    console.log(arr);
    console.log(makeHull(arr));