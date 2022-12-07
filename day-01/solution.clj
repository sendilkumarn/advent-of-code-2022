(require '[clojure.string :as str])

(defn sum [x] (map #(Integer/parseInt %) (str/split x #"\n")))

(def calories (sort (map #(reduce + (sum %)) (str/split (slurp "input.txt") #"\n\n"))))

(println (last calories))

(println (reduce + (take-last 3 calories)))