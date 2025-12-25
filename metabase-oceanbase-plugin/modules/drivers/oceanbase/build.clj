(ns build
  (:require [clojure.tools.build.api :as b]))

(def lib 'metabase/oceanbase)
(def version "1.0.0")
(def class-dir "target/classes")
(def jar-file (format "target/metabase-driver-oceanbase.jar"))

(defn clean [_]
  (b/delete {:path "target"}))

(defn jar [_]
  (clean nil)
  (b/copy-dir {:src-dirs ["src" "resources"]
               :target-dir class-dir})
  (b/jar {:class-dir class-dir
          :jar-file jar-file}))

(defn build [_]
  (jar nil))
