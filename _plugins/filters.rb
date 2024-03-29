module Jekyll
    class TagPageGenerator < Generator
        safe true

        def generate(site)
            # tags = site.posts.docs.flat_map { |post| post.data['tags'] || [] }.to_set
            # tags.each do |tag|
            #     newTag = tag.dup
            #     newTag = newTag.gsub(" ", "-")
            #     site.pages << TagPage.new(site, site.source, newTag)
            # end
            
            authors = []
            site.collections["team"].docs.flat_map.each do |team_member|
                if team_member.data['name_filter']
                    authors += [{ "name_filter" => team_member.data['name_filter'] || "", "author" => team_member.data['name'] || ""}]
                end
            end
            
            authors.each do |author|
                site.pages << AuthorPage.new(site, site.source, author["name_filter"], author["author"])
            end
        end
    end

    # class TagPage < Page
    #     def initialize(site, base, tag)
    #         @site = site
    #         @base = base
    #         @dir  = File.join('tag', tag)
    #         @name = 'index.html'

    #         self.process(@name)
    #         self.read_yaml(File.join(base, '_layouts'), 'tag.html')
            
    #         newTag = tag.dup
    #         newTag = newTag.gsub("-", " ")
            
    #         self.data['tag'] = newTag
    #         self.data['title'] = "Publicaciones etiquetadas con #{newTag}"
    #         self.data['description'] = "Descubre los mejores contenidos etiquetados con #{newTag}"
    #     end
    # end
    
    class AuthorPage < Page
        def initialize(site, base, name_filter, author)
            @site = site
            @base = base
            @dir  = 'publicaciones-de-' + name_filter
            @name = 'index.html'

            self.process(@name)
            self.read_yaml(File.join(base, '_layouts'), 'author.html')
            self.data['name_filter'] = name_filter
            self.data['author'] = author
            self.data['title'] = "Descubre las publicaciones de #{author}"
            self.data['description'] = "Descubre los mejores contenidos publicados por #{author}"
        end
    end
end