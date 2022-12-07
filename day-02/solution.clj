(require '[clojure.string :as str])

(def game-map (hash-map "X" "A" "Y" "B" "Z" "C"))

(defn to-arr [x] (str/split x #" "))

(def input (map to-arr (str/split (slurp "input.txt") #"\n")))

(defn get-value [x] (cond (= x "A") 1 (= x "B") 2 :else 3))

(defn scorer [[o, u]] 
    (+ (get-value u) (cond 
        (= o u) 3
        (or (and (= o "A") (= u "B")) (and (= o "B") (= u "C")) (and (= o "C") (= u "A"))) 6
        :else 0
)))

(defn get-winner [x] (get-value (cond (= x "A") "B" (= x "B") "C" :else "A")))

(defn get-loser [x] (get-value (cond (= x "C") "B" (= x "A") "C" :else "A")))


(defn scorer-2 [[o, u]] (cond 
    (= u "Y") (+ 3 (get-value o))
    (= u "Z") (+ 6 (get-winner o))
    :else (get-loser o)
))

(println (reduce + (map scorer (map (fn [x] [(first x), (get game-map (last x))]) input))))

(println (reduce + (map scorer-2 input)))




 