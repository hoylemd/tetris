from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = 'mikes_games/index.html'
